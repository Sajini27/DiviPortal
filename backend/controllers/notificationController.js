const Notification = require("../models/Notification");

exports.getNotifications = async (req, res) => {
  try {
    const userId = req.user.userId || req.user._id;
    const notifications = await Notification.find({
      $or: [{ staffId: userId }, { userId: userId }],
    })
      .sort({ createdAt: -1 })
      .populate("relatedId", "nameWithInitials email status");
    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching notifications", error });
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
    res.status(500).json({ message: "Error marking notification as read", error });
  }
};

// ✅ NEW: Get count of unread notifications
exports.getUnreadNotificationCount = async (req, res) => {
  try {
    const userId = req.user.userId || req.user._id;

    const count = await Notification.countDocuments({
      isRead: false,
      $or: [{ staffId: userId }, { userId: userId }],
    });

    res.status(200).json({ unreadCount: count });
  } catch (error) {
    console.error("Error fetching unread count:", error);
    res.status(500).json({ message: "Error fetching unread notifications count", error });
  }
};

module.exports = {
  getNotifications: exports.getNotifications,
  markAsRead: exports.markAsRead,
  getUnreadNotificationCount: exports.getUnreadNotificationCount, // ✅ add this line
};
