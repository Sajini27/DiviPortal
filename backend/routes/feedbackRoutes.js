const express = require('express');
const { body, validationResult } = require('express-validator');
const Feedback = require('../models/feedback');
const router = express.Router();

// GET route to fetch all feedbacks
router.get('/', async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ dateSubmitted: -1 }); // Sort by latest first
        res.status(200).json(feedbacks);
    } catch (err) {
        res.status(500).json({ message: "Server error, please try again later." });
    }
});

// POST route to handle feedback submission with validation
router.post('/', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('message').notEmpty().withMessage('Message is required'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

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