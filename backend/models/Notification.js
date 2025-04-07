const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // References staff
    required: false, // Optional for user notifications
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // References user
    required: false, // Optional for staff notifications
  },
  message: {
    type: String,
    required: true,
  },
  relatedId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the related upload
    ref: 'Upload',
    required: true,
  },
  serviceId: {
    type: String,
    required: true,
  },
  division: {
    type: String,
    required: false, // Optional for user notifications
  },
  path: {
    type: String,
    required: false, 
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;