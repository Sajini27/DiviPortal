const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Create a notification
router.post('/', async (req, res) => {
    try {
        const { userId, message } = req.body;

        // Validate input
        if (!userId || !message) {
            return res.status(400).json({ message: 'userId and message are required.' });
        }

        // Create and save the notification
        const notification = new Notification({ userId, message });
        await notification.save();

        res.status(201).json(notification);
    } catch (error) {
        console.error('Error creating notification:', error);
        res.status(500).json({ message: 'Failed to create notification.' });
    }
});

// Get notifications for a user
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Find notifications for the user
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Failed to fetch notifications.' });
    }
});

// Add mark-as-read endpoint
router.put('/:id/read', async (req, res) => {
    try {
      const notification = await Notification.findByIdAndUpdate(
        req.params.id,
        { read: true },
        { new: true }
      );
      res.status(200).json(notification);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Failed to mark as read' });
    }
  });

module.exports = router;