const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, notificationController.getNotifications);
router.get("/unreadCount", authMiddleware, notificationController.getUnreadNotificationCount); // ✅ new route
router.put("/:notificationId/read", authMiddleware, notificationController.markAsRead);

module.exports = router;
