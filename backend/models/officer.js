const mongoose = require('mongoose');
const User = require('./user');

const officerSchema = new mongoose.Schema({
  designation: {
    type: String,
    required: true,
  },
  fax: {
    type: String,
  },
  inSeat: {
    type: Boolean,
    default: false
  },
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }],
}, { discriminatorKey: '__t' });

const Officer = User.discriminator('Officer', officerSchema);

module.exports = Officer;
