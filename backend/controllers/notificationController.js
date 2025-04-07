const Notification = require("../models/Notification");

exports.getNotifications = async (req, res) => {
  try {
    const userId = req.user.userId || req.user._id; // Handle both token formats
    const notifications = await Notification.find({
      $or: [{ staffId: userId }, { userId: userId }], // Fetch for staff or user
    })
      .sort({ createdAt: -1 })
      .populate('relatedId', 'nameWithInitials email status'); // Include status
    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching notifications', error });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );
    res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error marking notification as read', error });
  }
};

module.exports = {
  getNotifications: exports.getNotifications,
  markAsRead: exports.markAsRead,
};