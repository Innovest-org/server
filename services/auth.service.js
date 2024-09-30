const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator  = require('validator')
const Admin = require("../db/models/adminModel");
const AdminUserDao = require("../common/daos/user.dao");

class AdminAuthServices {

    async login (username_or_email, password) {
        try {
            // console.log(username_or_email)
            // const email = is_mail ? username_or_email : null;
            if (!username_or_email || !password) {
                throw new Error('Username or password is missing');
            }
            const user = validator.isEmail(username_or_email) ? 
            await AdminUserDao.getUserByEmail(username_or_email) : 
            await AdminUserDao.getUserByUsername(username_or_email);
            
            if (!user) {
                throw new Error('User not found');
            }
            // will be enabled when password hashing is enabled
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Invalid password');
            }
            // if (password !== user.password) {
            //     throw new Error('Invalid password');
            // }
            const payload = {
                user: {
                    id: user.id,
                    role: user.role
                }
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
            return token;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    async logout (token)  {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            return decoded;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
    
}



module.exports = new AdminAuthServices();