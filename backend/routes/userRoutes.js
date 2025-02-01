const express = require("express");
const { getUserProfile, updateUserProfile, getUsers, createBooking, getBookingsForOfficer } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateUserProfile);
router.get('/users', getUsers); 
router.post('/book', createBooking);
router.get('/booked/:id', getBookingsForOfficer);

module.exports = router;
