const userDao = require('../common/daos/user.dao');
const fileManagement = require('./file_management.service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const nodemailer = require("nodemailer");
const randomPasswordService = require('./random_password.service');
const mailService = require('./mail.service');

class UserServices {
    async register(user , documents) {
        // check if any file name is already exist to avoid over writing
        for (const document of documents) {
            console.log(document.originalname)
            if (fileManagement.check_if_file_exist(document.originalname)) {
                throw new Error('File already exists with the same name');
            }
        }
        // save the given documents 
        const documents_directories = [] ;
        for (const document of documents) {
            try {
                documents_directories.push(fileManagement.save_file(document));
            }catch (error) {
                throw new Error('Error saving file: ' + error.message);
            }
        }
        user.id_documents = documents_directories;
        try {
            user.status = 'PENDING';
            const  randomPasswordGenerator = new randomPasswordService(6);
            user.password = await randomPasswordGenerator.generateRandomPassword();
            user.password_reset = true;
            const savedUser = await userDao.createUser(user);
            const payload = {
                user: {
                    id: savedUser.id,
                    role: savedUser.role,
                    national_id: savedUser.national_id,
                    email: savedUser.email,
                    username: savedUser.username,
                    need_reset_password: savedUser.password_reset,
                    permissions: savedUser.permissions
                }
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
            return token;
        }catch (error) {
            // delete the saved files if the user creation failed
            for (const document of documents) {
                fileManagement.delete_file(document.originalname);
            }
            throw new Error('Error creating user: ' + error.message)
        }
    }
    async login (username_or_email , password) {
        if (!username_or_email || !password) {
            throw new Error('Username/email or password is missing');
        }
        const user = validator.isEmail(username_or_email) ?
            await userDao.getUserByEmail(username_or_email) :
            await userDao.getUserByUsername(username_or_email);

        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        const userAllowed = user.status === 'APPROVED' ? true : false ;
        if (!userAllowed) {
            if (user.status === 'REJECTED') {
                throw new Error('User is rejected');
            }
            if (user.status === 'PENDING') {
                throw new Error('User is pending');
            }
        }
        if (!isMatch) {
            throw new Error('Invalid password');
        }
        const payload = {
            user: {
                id: user.id,
                role: user.role,
                national_id: user.national_id,
                permissions: user.permissions , 
                need_reset_password: user.password_reset
            }
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        return token;
    }

    async forgetPassword(email) {
        // this will reset the password and send mail to the user
        // generate a random password
        try {
            const user = await userDao.getUserByEmail(email);
            if (!user) {
                throw new Error('User not found');
            }
            console.log(user.id)
            if (user.password_reset) {
                throw new Error('User already requested to reset password');
            }
            const randomPasswordGenerator = new randomPasswordService(15);
            const randomPassword = await randomPasswordGenerator.generateRandomPassword();
            console.log(randomPassword);
            // send this password to the user email
            mailService.sendResetPasswordMail(email , randomPassword);
            // hash the password and save it to the user
            const userId = user.id ;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(randomPassword, salt);
            // to to mark the user need to reset his password
            await userDao.resetPassword(userId , hashedPassword , true);
        }catch (error) {
            throw new Error('Error resetting user: ' + error.message);
        }
    }

    async updatePassword(userId, previousPassword , newPassword) {
        console.log(userId)
        const user = await userDao.getUserById(userId);
        console.log(user)   
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(previousPassword, user.password);
        if (!isMatch) {
            throw new Error('Invalid previous password');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        try {
            await userDao.resetPassword(userId , hashedPassword , false);
        }catch (error) {
            throw new Error('Error updating password: ' + error.message);
        }
    }

}

module.exports = new UserServices();
