const User = require('../db/models/userModel');
const UserDTO = require('../common/dtos/UserDTO');

/**
 * Creates a new user.
 * @param {Object} userData - The data for the new user.
 * @param {string} userData.username - The username of the user.
 * @param {string} userData.email - The email of the user.
 * @param {string} userData.password - The password of the user.
 * @returns {Promise<UserDTO>} The created user as a UserDTO object.
 * @throws {Error} If there is an error while creating the user.
 */
const createUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    return new UserDTO(user);
  } catch (error) {
    throw new Error('Error creating user');
  }
};

/**
 * Retrieves a user by their username.
 * @param {string} username - The username of the user to retrieve.
 * @returns {Promise<UserDTO>} The user as a UserDTO object.
 * @throws {Error} If the user is not found or there is an error retrieving the user.
 */
const getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({ username }).exec();
    if (!user) {
      throw new Error('User not found');
    }
    return new UserDTO(user);
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Retrieves all users.
 * @returns {Promise<UserDTO[]>} An array of all users as UserDTO objects.
 */
const getAllUsers = async () => {
  const users = await User.find({});
  return users.map(user => new UserDTO(user));
};

module.exports = { createUser, getUserByUsername, getAllUsers };
