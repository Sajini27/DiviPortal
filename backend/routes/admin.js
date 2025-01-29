const express = require('express');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/admin-dashboard', authenticate, authorize(['Admin']), (req, res) => {
    res.json({ message: 'Welcome to the Admin Dashboard' });
});

router.get('/officer-dashboard', authenticate, authorize(['Officer']), (req, res) => {
    res.json({ message: 'Welcome to the Officer Dashboard' });
});

router.get('/staff-dashboard', authenticate, authorize(['Staff']), (req, res) => {
    res.json({ message: 'Welcome to the Staff Dashboard' });
});

router.get('/user-profile', authenticate, authorize(['User']), (req, res) => {
    res.json({ message: `Welcome ${req.user.name} to your profile` });
});

module.exports = router;
