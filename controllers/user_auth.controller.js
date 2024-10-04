const UserService = require('../services/user_auth.service');
const RegisterUserDTO = require('../common/dtos/auth/register_user.dto');
const LoginDTO = require('../common/dtos/auth/login.dto');
class UserController {
  /**
   * Registers a new user.
   * @param {Object} req - The HTTP request object containing the user data in the body.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<void>} - Responds with the registered user object or an error message.
   */
  async register(req, res) {
    console.log(req.body);
    const registerUserDTO = new RegisterUserDTO(req.body);
    try {
      const token = await UserService.register(registerUserDTO, req.files);
      res
      .status(201)
      .cookie('token', token, { httpOnly: true })
      .json({ message: 'Registration successful' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Logs in an existing user with the given username or email and password.
   * @param {Object} req - The HTTP request object containing the username or email and password in the body.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<void>} - Responds with a JWT token for the user in a cookie or an error message.
   * @throws {Error} If the user does not exist or if the password is invalid.
   */
  async login(req, res) {
    const { username_or_email, password } = req.body;
    const loginDTO = new LoginDTO(username_or_email, password);
    const validationError = loginDTO.isValid();
    if (validationError) {
      return res.status(400).json({ message: 'Invalid login data' });
    }
    try {
      const token = await UserService.login(username_or_email, password);
      res
        .status(200)
        .cookie('token', token, { httpOnly: true })
        .json({ message: 'Login successful' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new UserController();