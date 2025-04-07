const express = require('express');
const uploadController = require('../controllers/uploadController');
const uploadMiddleware = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware'); // Protect with auth

const router = express.Router();

// File Upload Route
router.post('/', uploadMiddleware, uploadController.uploadFiles);

// Fetch Uploads by Service ID
router.get('/', uploadController.getUploadsByServiceId);

// Update Status Route
router.put('/:uploadId/status', authMiddleware, uploadController.updateStatus);

module.exports = router;