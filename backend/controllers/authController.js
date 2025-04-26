const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// User Signup
const signup = async (req, res) => {
    const { name, email, password, nic } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Validate NIC format
        const nicRegex = /^(?:\d{9}[vV]|\d{12})$/;
        if (!nicRegex.test(nic)) {
            return res.status(400).json({ message: 'Invalid NIC format' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            nic,
            role: 'user',
            phone: 0,
            address: '',
            gsd: ''
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', name: newUser.name });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
};

// User Login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            token,
            role: user.role,
            name: user.name,
            id: user._id,
            nic: user.nic,
            message: 'Login successful'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const logout = async (req, res) => {
    res.status(200).json({ message: 'Logout successful' });
};

module.exports = { signup, login, logout };
