const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: false, 
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: false, 
  },
  message: {
    type: String,
    required: true,
  },
  relatedId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Upload',
    required: true,
  },
  serviceId: {
    type: String,
    required: true,
  },
  division: {
    type: String,
    required: false, 
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