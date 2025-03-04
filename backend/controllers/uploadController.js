const Upload = require('../models/upload');

exports.uploadFiles = async (req, res) => {
    try {
        const { nameWithInitials, email, contactNumber, uid, serviceId } = req.body;
        const uploadedFiles = [];

        if (req.files) {
            Object.entries(req.files).forEach(([key, fileArray]) => {
                const file = fileArray[0]; // Get the uploaded file
                const relativePath = `uploads/${file.filename}`; // Use only the relative path

                uploadedFiles.push({ name: key, path: relativePath });
            });
        }

        const upload = new Upload({
            nameWithInitials,
            email,
            contactNumber,
            uid,
            serviceId,
            files: uploadedFiles
        });

        await upload.save();
        res.status(201).json({ message: 'Form submitted successfully', upload });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving form data', error });
    }
};

