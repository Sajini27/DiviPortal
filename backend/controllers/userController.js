const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Booking = require("../models/bookings");

// Get user profile
const getUserProfile = async (req, res) => {
    try {
      console.log(`User ID: ${req.user.userId}`); // Log user ID to check
      const user = await User.findById(req.user.userId).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  

// Update user profile
const updateUserProfile = async (req, res) => {
    try {
        const { name, phone, address, gsd} = req.body;

        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = name || user.name;
        user.phone = phone || user.phone;
        user.address = address || user.address;
        user.gsd = gsd || user.gsd;

        await user.save();
        res.json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const getUsers = async (req, res) => {
  try {
      const users = await User.find({}, '_id name email'); 
      res.json(users);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


const createBooking = async (req, res) => {
  try {
    const { officerId, date, userId } = req.body;

    // Validate required fields
    if (!officerId || !date || !userId) {
      return res.status(400).json({ message: 'Officer, date, and user ID are required.' });
    }

    // Parse the date from the request and normalize it by setting seconds and ms to 0.
    const appointmentDate = new Date(date);
    appointmentDate.setSeconds(0, 0);

    // If your booking slots are 30 minutes, create a date range for the query.
    const startTime = new Date(appointmentDate);
    const endTime = new Date(appointmentDate);
    endTime.setMinutes(endTime.getMinutes() + 30);

    // Use a range query to check if an appointment exists within the time slot.
    const existingBooking = await Booking.findOne({
      officerId,
      date: { $gte: startTime, $lt: endTime },
    });
    if (existingBooking) {
      return res.status(400).json({ message: 'Officer is already booked for this date/time.' });
    }

    const booking = new Booking({ officerId, date: appointmentDate, userId });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error in createBooking:', error);
    res.status(400).json({ message: error.message });
  }
};


const getBookingsForOfficer = async (req, res) => {
  try {
    const { officerId } = req.params;
    const bookings = await Booking.find({ officerId });
    const bookedSlots = bookings.map((booking) => booking.date);
    res.status(200).json({ bookedSlots });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
;



module.exports = { getUserProfile, updateUserProfile, getUsers, createBooking,  getBookingsForOfficer   };
