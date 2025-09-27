const models = require('../models/index');
const bcrypt = require('bcryptjs');

// CREATE: Register new user
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body; // ← Changed to lowercase

    // Validation
    if (!username || !email || !password) { // ← Changed to lowercase
      return res.status(400).json({ 
        success: false,
        message: 'All fields are required' 
      });
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Check if user already exists
    const existingUser = await models.user.findOne({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Check if username exists - CHANGED TO LOWERCASE
    const existingUsername = await models.user.findOne({
      where: { username } // ← Changed to lowercase
    });

    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: 'Username already taken'
      });
    }

    // Hash password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user with hashed password - CHANGED TO LOWERCASE
    const newUser = await models.user.create({
      username, // ← Changed to lowercase
      email,
      password: hashedPassword,
    });

    // Remove password from response for security - CHANGED TO LOWERCASE
    const userResponse = {
      id: newUser.id,
      username: newUser.username, // ← Changed to lowercase
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
    };

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: userResponse,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error.message,
    });
  }
};

// GET: Fetch all users
const getUsers = async (req, res) => {
  try {
    const users = await models.user.findAll({
      attributes: { exclude: ['password'] } // Don't return passwords
    });
    
    return res.status(200).json({
      success: true,
      count: users.length,
      users: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message,
    });
  }
};

// GET: Fetch user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await models.user.findByPk(id, {
      attributes: { exclude: ['password'] } // Don't return password
    });

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    return res.status(200).json({
      success: true,
      user: user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message,
    });
  }
};

// UPDATE: Update user by ID - CHANGED TO LOWERCASE
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body; // ← Changed to lowercase

    const user = await models.user.findByPk(id);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Update fields if provided - CHANGED TO LOWERCASE
    if (username) user.username = username; // ← Changed to lowercase
    if (email) user.email = email;
    
    // Hash new password if provided
    if (password) {
      const saltRounds = 10;
      user.password = await bcrypt.hash(password, saltRounds);
    }

    await user.save();

    // Remove password from response - CHANGED TO LOWERCASE
    const userResponse = {
      id: user.id,
      username: user.username, // ← Changed to lowercase
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user: userResponse,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message,
    });
  }
};

// DELETE: Remove user by ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await models.user.findByPk(id);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    await user.destroy();

    return res.status(200).json({ 
      success: true,
      message: 'User deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message,
    });
  }
};

// LOGIN: User login - CHANGED TO LOWERCASE
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user by email
    const user = await models.user.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Remove password from response - CHANGED TO LOWERCASE
    const userResponse = {
      id: user.id,
      username: user.username, // ← Changed to lowercase
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: userResponse
    });

  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser
};