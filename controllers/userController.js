const {
  createUser,
  getUserByUsername,
  getAllUsers
} = require('../services/userService');

// Controller method to handle user creation
exports.createUser = async (req, res) => {
  try {
    const userData = req.body;
    const userDTO = await createUser(userData);
    res.status(201).json(userDTO);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller method to handle getting user by username
exports.getUser = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users' });
  }
};
