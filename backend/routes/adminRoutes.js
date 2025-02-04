// routes/adminRoutes.js
const express = require('express');
const axios = require('axios');
const {
  createOffice,
  getAllOffices,
  updateOffice,
  deleteOffice,
  createStaff,
  getAllStaff,
  updateStaff,
  deleteStaff,
  getOfficeById,
  getStaffById,
  getBookingsForOfficer,
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById
} = require('../controllers/adminController');

const Booking = require('../models/bookings'); // Make sure the file is named correctly (e.g., bookings.js)

const router = express.Router();

// ---------------------------
// Offices (Officers) Routes
// ---------------------------
router.post('/offices', createOffice);
router.get('/offices', getAllOffices);
router.get('/offices/:id', getOfficeById);
router.put('/offices/:id', updateOffice);
router.delete('/offices/:id', deleteOffice);

// ---------------------------
// Staff Routes
// ---------------------------
router.post('/staff', createStaff);
router.get('/staff', getAllStaff);
router.get('/staff/:id', getStaffById);
router.put('/staff/:id', updateStaff);
router.delete('/staff/:id', deleteStaff);

// ---------------------------
// Booking Routes
// ---------------------------

// Get bookings for an officer
router.get('/bookings/:officerId', getBookingsForOfficer);

// Update booking status and send notification if status is "Accepted"
router.put('/bookings/:bookingId', async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    console.log("BACKEND - Received Request:", { bookingId, status });

    // Update the booking document
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    console.log("BACKEND - Updated Booking:", updatedBooking);

    if (!updatedBooking) {
      console.log("BACKEND - Booking not found:", bookingId);
      return res.status(404).json({ message: 'Booking not found' });
    }

    // If the new status is "Accepted", send a notification
    if (status === 'Accepted') {
      console.log("BACKEND - Sending Notification for User:", updatedBooking.userId);
      await axios.post('http://localhost:5000/api/notifications', {
        userId: updatedBooking.userId,
        message: `Your booking (ID: ${bookingId}) has been accepted.`
      });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    console.error('BACKEND - Error:', error);
    res.status(500).json({ message: 'Failed to update booking status.' });
  }
});

// ---------------------------
// User Routes
// ---------------------------
router.post('/user', createUser);
router.get('/user', getAllUsers);
router.get('/user/:id', getUserById);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

module.exports = router;
