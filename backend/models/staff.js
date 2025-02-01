const mongoose = require('mongoose');
const User = require('./user');

// Staff Schema
const staffSchema = new mongoose.Schema({
  division: {
    type: String,
    required: true,
  },
});

// Check if the discriminator already exists before defining it
const Staff = User.discriminator('Staff', staffSchema);

module.exports = Staff;