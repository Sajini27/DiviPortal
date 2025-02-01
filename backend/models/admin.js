const mongoose = require('mongoose');
const User = require('./user');

// Admin Schema
const adminSchema = new mongoose.Schema({
  adminLevel: {
    type: String,
    enum: ['super', 'normal'],
    default: 'normal',
  },
  permissions: {
    type: [String], 
    default: [],
  },
});

// Check if the discriminator already exists before defining it
const Admin = User.discriminator('Admin', adminSchema);

module.exports = Admin;