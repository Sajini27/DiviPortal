const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Base User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'staff', 'officer'],
    default: 'user',
  },
  phone: {
    type: Number,
  },
  address: {
    type: String,
  },
  gsd: {
    type: String,
  },
});

// Match password function
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Check if the model already exists before defining it
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;