const jwt = require('jsonwebtoken');
const express = require('express');
const { getAdminData } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/admin', authMiddleware, getAdminData);
module.exports = router;

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user information to request
    next(); // Allow to proceed to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
