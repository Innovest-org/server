const UserService = require('../services/user_auth.service');
const RegisterUserDTO = require('../common/dtos/auth/register_user.dto');
const LoginDTO = require('../common/dtos/auth/login.dto');
class UserController {
    async register(req, res) {
        console.log(req.body)   
        const registerUserDTO = new RegisterUserDTO(req.body);
        try {
            const newUser = await UserService.register(
                registerUserDTO , req.files
            );
            res.status(201).json({ message: 'Registration successful' , newUser });
        }catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req, res) {
        const { username_or_email, password } = req.body;
        const loginDTO = new LoginDTO(username_or_email, password);
        const validationError = loginDTO.isValid();
        if (validationError) {
            return res.status(400).json({ message: 'Invalid login data' });
        }
        try {
            const token = await UserService.login(username_or_email, password);
            res.status(200)
                .cookie('token', token, { httpOnly: true })
                .json({ message: 'Login successful' });
        }catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new UserController();