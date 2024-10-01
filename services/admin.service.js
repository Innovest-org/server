const UserDao = ('../common/daos/user.dao');
/**
 * AdminServices class provides methods for managing admin users.
 * It interacts with the UserDao to perform CRUD operations on admin data.
 */
const UserDao = require('../common/daos/user.dao');
const bycrypt = require('bcryptjs');
class AdminServices {
  
  /**
   * Creates a new admin user.
   * @param {Object} adminData - The data for the new admin user.
   * @returns {Promise<Object>} The created admin user.
   */
  async createAdmin(adminData) {
    const salt = await bycrypt.genSalt(10);
    adminData.password = await bycrypt.hash(adminData.password, salt);
    return await UserDao.createUser(adminData);
  }
  
  /**
   * Updates an existing admin user by ID.
   * @param {string} id - The ID of the admin user to update.
   * @param {Object} adminData - The new data for the admin user.
   * @returns {Promise<Object>} The updated admin user.
   */
  async updateAdmin(id, adminData) {
    return await UserDao.updateUser(id, adminData);
  }
  
  /**
   * Retrieves all admin users.
   * @returns {Promise<Array>} A list of all admin users.
   */
  async getAllAdmins() {
    return await UserDao.getAllUsers();
  }
  
  /**
   * Retrieves an admin user by ID.
   * @param {string} id - The ID of the admin user to retrieve.
   * @returns {Promise<Object>} The admin user with the specified ID.
   */
  async getAdminByID(id) {
    return await UserDao.getUserByID(id);
  }
  
  /**
   * Deletes an admin user by ID.
   * @param {string} id - The ID of the admin user to delete.
   * @returns {Promise<Object>} The deleted admin user.
   */
  async deleteAdmin(id) {
    return await UserDao.deleteUser(id);
  }
}

module.exports = new AdminServices();
