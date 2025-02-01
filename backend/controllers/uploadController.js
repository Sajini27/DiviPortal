const File = require('../models/File');

const uploadFiles = async (req, res) => {
    try {
        const { nameWithInitials, email, contactNumber } = req.body;
        const files = req.files;

        if (!files) {
            return res.status(400).json({ message: 'No files uploaded.' });
        }

        // Save form data and file metadata to MongoDB
        const savedFiles = await Promise.all(
            Object.entries(files).map(async ([fieldName, fileArray]) => {
                const file = fileArray[0];
                const newFile = new File({
                    filename: file.originalname,
                    path: file.path,
                    size: file.size,
                    uploadDate: new Date(),
                    userDetails: {
                        nameWithInitials,
                        email,
                        contactNumber,
                    },
                });
                return await newFile.save();
            })
        );

        res.status(200).json({ message: 'Files uploaded successfully.', files: savedFiles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error uploading files.' });
    }
};

module.exports = { uploadFiles };