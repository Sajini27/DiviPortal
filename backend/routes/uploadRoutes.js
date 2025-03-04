const express = require('express');
const uploadController = require('../controllers/uploadController');
const uploadMiddleware = require('../middleware/uploadMiddleware');

const router = express.Router();

// File Upload Route
router.post('/', uploadMiddleware, uploadController.uploadFiles); 

module.exports = router;
