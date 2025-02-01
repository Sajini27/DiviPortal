const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up Multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    },
});

// File filter to allow only PDF files
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed.'), false);
    }
};

const upload = multer({ storage, fileFilter });

// Create the 'uploads' folder if it doesn't exist
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Middleware for handling file uploads
const uploadMiddleware = upload.fields([
    { name: 'birthCertificate', maxCount: 1 },
    { name: 'marriageCertificate', maxCount: 1 },
    { name: 'nicCopies', maxCount: 1 },
    { name: 'residenceProof', maxCount: 1 },
    { name: 'affidavit', maxCount: 1 },
    { name: 'otherDocuments', maxCount: 1 },
]);

module.exports = uploadMiddleware;