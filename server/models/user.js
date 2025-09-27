const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  username: {  // Change Username to username (lowercase)
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'username' // Explicitly set the column name
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'users',
  // Remove indexes for now to avoid alteration issues
});

module.exports = User;