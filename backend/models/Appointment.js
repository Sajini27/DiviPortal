const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', //User model
    required: true,
  },
  officer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Officer', //Officer model
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
