const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const router = express.Router();

// Sign Up Route
router.post('/signup', async (req, res) => {
    const { name, nic, email, password, division, role } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with hashed password
        const newUser = new User({ name, nic, email, password: hashedPassword, division, role });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log('Received login request for email:', email);

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: "User not found" });
        }

        console.log('User found:', user); // Log the user found in the database
        console.log('Stored password hash:', user.password); // Log the stored password hash

        // Check password using the comparePassword method
        console.log('Received password:', password);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password comparison result:', isMatch); // Log password comparison result

        if (!isMatch) {
            console.log('Invalid password');
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log('Login successful, returning token');
        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
        console.error('Error during login:', err); // Log the error
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

module.exports = router;
