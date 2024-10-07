const UserService = require('../services/user.service');


class UserController {
  /**
   * Updates an existing user identified by the given ID.
   * @param {Object} req - The HTTP request object containing the user ID in the params and update data in the body.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<void>} - Responds with the updated user or an error message.
   */
  async updateUser(req, res) {
    try {
      const updatedUser = await UserService.updateUser(req.params.id, req.body);
      if (!updatedUser) return res.status(404).json({ message: 'User not found' });
      res.status(200).json({ message: 'User updated', updatedUser });
    } catch (error) {
      res.status(400).json({ message: error.message});
    }
  }

  /**
   * Deletes a user identified by the given ID.
   * @param {Object} req - The HTTP request object containing the user ID in the params.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<void>} - Responds with a 204 status code if successful or an error message.
   */
  async deleteUser(req, res) {
    try {
      const deletedUser = await UserService.deleteUser(req.params.id);
      if (!deletedUser) return res.status(404).json({ message: 'User not found' });
      res.status(200).json({ message: 'User deleted', deletedUser });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Retrieves a user identified by the given ID.
   * @param {Object} req - The HTTP request object containing the user ID in the params.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<void>} - Responds with the user or an error message.
   */
  async getUserById(req, res){
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found'});
      res.status(200).json({ user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Retrieves all users.
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<void>} - Responds with a list of all users or an error message.
   */
  async getUsers(req, res) {
    try {
      const users = await UserService.getAllUsers()
      res.status(200).json({ users });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new UserController();
