const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment'); 


router.get('/available/:officerId', async (req, res) => {
  try {
    const { officerId } = req.params;

  
    const appointments = await Appointment.find({ officer: officerId });

    // Define officer's working hours (for example, 9 AM to 5 PM)
    const workingHours = Array.from({ length: 9 }, (_, i) => i + 9); // [9, 10, ..., 17]

    // Filter out the hours that are already booked
    const availableSlots = workingHours.filter(hour => {
      return !appointments.some(app => new Date(app.date).getHours() === hour);
    });

    res.status(200).json({ availableSlots });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving available slots', error: err });
  }
});

// Book an appointment
router.post('/book', async (req, res) => {
    try {
      const { userId, officerId, date, purpose } = req.body;
  
      // Check if the slot is available
      const existingAppointment = await Appointment.findOne({ officer: officerId, date });
      if (existingAppointment) {
        return res.status(400).json({ message: 'This time slot is already booked.' });
      }
  
      // Create a new appointment
      const appointment = new Appointment({
        user: userId,
        officer: officerId,
        date,
        purpose,
      });
  
      await appointment.save();
      res.status(201).json({ message: 'Appointment booked successfully', appointment });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
