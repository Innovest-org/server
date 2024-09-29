const Admin = require('../../db/models/adminModel');

/**
 * UserDao class provides methods for interacting with admin user data.
 * It performs CRUD operations and handles interactions with the Admin model.
 */
class UserDao {
  /**
   * Creates a new user with the given data.
   * @param {Object} userData - The user data to be stored in the database.
   * @returns {Promise<Admin>} - The newly created user.
   * @throws {Error} If the user couldn't be created.
   */
  async createUser(userData) {
    try {
      const user = new Admin(userData);
      await user.save();
      return user;
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  /**
   * Updates the user with the given id with the provided data.
   * @param {string} id - The id of the user to be updated.
   * @param {Object} userData - The new data to update the user with.
   * @returns {Promise<Admin>} - The updated user.
   * @throws {Error} If the user couldn't be updated.
   */
  async updateUser(id, userData) {
    try {
      return await Admin.findByIdAndUpdate(id, userData, { new: true });
    } catch (error) {
      throw new Error('Error updating user: ' + error.message);
    }
  }

  /**
   * Deletes the user with the given id.
   * @param {string} id - The id of the user to be deleted.
   * @returns {Promise<Admin>} - The deleted user.
   * @throws {Error} If the user couldn't be deleted.
   */
  async deleteUser(id) {
    try {
      return await Admin.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message);
    }
  }

  /**
   * Retrieves all users with the role of either 'ADMIN' or 'SUPER_ADMIN'.
   * @returns {Promise<Admin[]>} - A list of all users with the roles 'ADMIN' or 'SUPER_ADMIN'.
   * @throws {Error} If the users couldn't be fetched.
   */
  async getAllUsers() {
    try {
      return await Admin.find({ role: { $in: ['ADMIN', 'SUPER_ADMIN'] } });
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  }

  /**
   * Retrieves the user with the given id.
   * @param {string} id - The id of the user to be retrieved.
   * @returns {Promise<Admin>} - The user with the given id.
   * @throws {Error} If the user couldn't be fetched.
   */
  async getUserByID(id) {
    try {
      return await Admin.findById(id);
    } catch (error) {
      throw new Error('Error fetching user: ' + error.message);
    }
  }
  /**
   * Checks if a user is an admin
   * @param {string} admin_id - The unique identifier of the admin
   * @returns {Promise<boolean>} - Returns true if the user is an admin, false otherwise
   * @throws {Error} - If the admin cannot be found or there's an error querying the database
   */
  async isAdmin(admin_id) {
    try {
      const admin = await Admin.findById(admin_id);
      if (admin && admin.role === 'ADMIN') {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error checking admin status:', error);
      throw new Error('Unable to verify admin status');
    }
  }
}

module.exports = new UserDao();
