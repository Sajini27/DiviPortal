const express = require('express');
const Feedback = require('../models/feedback'); // Correct Mongoose model import
const router = express.Router();

// POST route to handle feedback submission
router.post('/api/feedback', async (req, res) => {  // Change '/' to '/api/feedback'
    const { name, email, message } = req.body;
    try {
        const newFeedback = new Feedback({ name, email, message });
        await newFeedback.save();
        res.status(201).json({ message: "Your feedback has been submitted successfully." });
    } catch (err) {
        res.status(500).json({ message: "Server error, please try again later." });
    }
});


module.exports = router;
