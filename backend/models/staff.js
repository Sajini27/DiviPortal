const mongoose = require('mongoose');
const User = require('./user');


const staffSchema = new mongoose.Schema({
  division: {
    type: String,
    required: true,
  },
});

const Staff = User.discriminator('Staff', staffSchema);

module.exports = Staff;