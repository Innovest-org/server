const express = require('express');
const router = express.Router();
const {
  createUser,
  getUser,
  getAllUsers
} = require('../controllers/userController');

// Route to create a new user
router.post('/', createUser);

// Route to get a user by username
router.get('/:id', getUser);

// Route to get all users
router.get('/', getAllUsers);

module.exports = router;
