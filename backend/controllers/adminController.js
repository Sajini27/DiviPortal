const authMiddleware = require('../middleware/authMiddleware');

const getAdminData = (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  res.json({ message: 'Admin data' });
};

module.exports = { getAdminData };
