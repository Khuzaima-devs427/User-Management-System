var express = require('express');
var router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser
} = require('../controllers/user');

// POST /users/register - Create new user
router.post('/register', createUser);

// POST /users/login - User login
router.post('/login', loginUser);

// GET /users - Get all users
router.get('/', getUsers);

// GET /users/:id - Get user by ID
router.get('/:id', getUserById);

// PUT /users/:id - Update user
router.put('/:id', updateUser);

// DELETE /users/:id - Delete user
router.delete('/:id', deleteUser);

module.exports = router;