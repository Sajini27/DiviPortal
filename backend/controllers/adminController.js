const { Officer, Staff } = require('../models');
const bcrypt = require('bcryptjs');
const Booking = require('../models/bookings');

// CRUD for Offices (Officers)

// Create a new office (officer)
const createOffice = async (req, res) => {
  try {
    console.log("Received data:", req.body);

    const { password, ...rest } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); 

    // Create the officer with the hashed password
    const office = new Officer({
      ...rest,
      password: hashedPassword,
    });

    await office.save();
    const staffResponse = office.toObject();
    delete staffResponse.password;
    res.status(201).json(staffResponse);
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



// Get all offices (officers)
const getAllOffices = async (req, res) => {
  try {
    const offices = await Officer.find();
    res.status(200).json(offices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an office (officer) by ID
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

// Delete an office (officer) by ID
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

// CRUD for Staff

// Create a new staff member
const createStaff = async (req, res) => {
  try {
    console.log("Received data:", req.body);

    const { password, ...rest } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); 

    // Create the staff with the hashed password
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


//get one staff memeber
const getStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const staffMember = await Staff.findById(id);
    console.log(staffMember);
    if (!staffMember) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.status(200).json(staffMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all staff members
const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a staff member by ID
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

// Delete a staff member by ID
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

// Get bookings for a specific officer
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
  getOfficeById,
  getStaffById,
  getBookingsForOfficer,
};