const express = require("express");
const { getUserProfile, updateUserProfile, getUsers } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateUserProfile);
router.get('/users', getUsers); 

module.exports = router;
