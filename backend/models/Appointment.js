// models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming you have a User model
    required: true,
  },
  officer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Officer', // assuming you have an Officer model
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
