const express = require('express');
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
  getBookingsForOfficer
} = require('../controllers/adminController');
const router = express.Router();

// CRUD for Offices (Officers)
router.post('/offices', createOffice);
router.get('/offices', getAllOffices);
router.get('/offices/:id', getOfficeById);
router.put('/offices/:id', updateOffice);
router.delete('/offices/:id', deleteOffice);

// CRUD for Staff
router.post('/staff', createStaff);
router.get('/staff', getAllStaff);
router.get('/staff/:id', getStaffById);
router.put('/staff/:id', updateStaff);
router.delete('/staff/:id', deleteStaff);

router.get('/bookings/:officerId', getBookingsForOfficer);

module.exports = router;