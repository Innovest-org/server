const LoginService = require('../services/auth.service');

class AdminAuthController {
    
    async login  (req, res) {
        const { username_or_email, password } = req.body;
        try {
            const user = await LoginService.login(username_or_email, password);
            res.status(200).cookie('token', user, { httpOnly: true }).json({ message: 'Login successful' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new AdminAuthController();