const { Officer, Staff, User } = require('../models');
const bcrypt = require('bcryptjs');
const Booking = require('../models/bookings');

// =====================
// Offices (Officers)
// =====================

// Create a new officer
const createOffice = async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const { password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const office = new Officer({
      ...rest,
      password: hashedPassword,
    });
    await office.save();
    const officeResponse = office.toObject();
    delete officeResponse.password;
    res.status(201).json(officeResponse);
  } catch (error) {
    console.error("Error creating officer:", error);
    res.status(400).json({ message: error.message });
  }
};

const getOfficeById = async (req, res) => {
  try {
    const { id } = req.params;
    const officer = await Officer.findById(id);
    if (!officer) {
      return res.status(404).json({ message: "Officer not found" });
    }
    res.status(200).json(officer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOffices = async (req, res) => {
  try {
    const offices = await Officer.find();
    res.status(200).json(offices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOffice = async (req, res) => {
  try {
    const office = await Officer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!office) {
      return res.status(404).json({ message: 'Officer not found' });
    }
    res.status(200).json(office);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteOffice = async (req, res) => {
  try {
    const office = await Officer.findByIdAndDelete(req.params.id);
    if (!office) {
      return res.status(404).json({ message: 'Office not found' });
    }
    res.status(200).json({ message: 'Office deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =====================
// Staff
// =====================

const createStaff = async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const { password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const staff = new Staff({
      ...rest,
      password: hashedPassword,
    });
    await staff.save();
    const staffResponse = staff.toObject();
    delete staffResponse.password;
    res.status(201).json(staffResponse);
  } catch (error) {
    console.error("Error creating staff:", error);
    res.status(400).json({ message: error.message });
  }
};

const getStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    const staffMember = await Staff.findById(id);
    if (!staffMember) {
      return res.status(404).json({ message: "Staff not found" });
    }
    res.status(200).json(staffMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    res.status(200).json(staff);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    res.status(200).json({ message: 'Staff deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =====================
// Users
// =====================

const createUser = async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const { password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      ...rest,
      password: hashedPassword,
    });
    await user.save();
    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(201).json(userResponse);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userMember = await User.findById(id);
    if (!userMember) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(userMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =====================
// Bookings for Officer (if needed)
// =====================

const getBookingsForOfficer = async (req, res) => {
  try {
    const { officerId } = req.params;
    const bookings = await Booking.find({ officerId }).populate('userId', 'name email');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createOffice,
  getAllOffices,
  updateOffice,
  deleteOffice,
  createStaff,
  getAllStaff,
  updateStaff,
  deleteStaff,
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getOfficeById,
  getStaffById,
  getUserById,
  getBookingsForOfficer,
};
