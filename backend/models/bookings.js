const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  officerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Officer',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Done'],
    default: 'Pending',
  },
});

const Booking = mongoose.model('Booking', bookingSchema);
bookingSchema.virtual('notifications', {
  ref: 'Notification',
  localField: 'userId',
  foreignField: 'userId'
});
module.exports = Booking;