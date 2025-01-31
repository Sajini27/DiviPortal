const bcrypt = require("bcryptjs");
const User = require("../models/User");

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
      const users = await User.find({}, '_id name email'); // Fetch only necessary fields
      res.json(users);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


module.exports = { getUserProfile, updateUserProfile, getUsers  };
