const userDao = require('../common/daos/user.dao');
const FileManagement = require('./file_management.service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
class UserServices {
    async register(user , documents) {
        console.log(user)
        // check if any file name is already exist to avoid over writing
        for (const document of documents) {
            if (FileManagement.check_if_file_exist(document.originalname)) {
                throw new Error('File already exists with the same name');
            }
        }
        // save the given documents 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        const documents_directories = [] ;
        for (const document of documents) {
            try {
                documents_directories.push(FileManagement.save_file(document));
            }catch (error) {
                throw new Error('Error saving file: ' + error.message);
            }
        }
        user.id_documents = documents_directories;
        try {
            const savedUser = await userDao.createUser(user);
            const payload = {
                user: {
                    id: savedUser.id,
                    role: savedUser.role,
                    national_id: savedUser.national_id,
                    email: savedUser.email,
                    username: savedUser.username,
                    permissions: savedUser.permissions
                }
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
            return token;
        }catch (error) {
            // delete the saved files if the user creation failed
            for (const document of documents) {
                FileManagement.delete_file(document.originalname);
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
        if (!isMatch) {
            throw new Error('Invalid password');
        }
        const payload = {
            user: {
                id: user.id,
                role: user.role,
                national_id: user.national_id,
                permissions: user.permissions
            }
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        return token;
    }
}

module.exports = new UserServices();
