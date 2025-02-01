const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
    uploadDate: { type: Date, default: Date.now },
    userDetails: {
        nameWithInitials: { type: String, required: true },
        email: { type: String, required: true },
        contactNumber: { type: String, required: true },
    },
});

module.exports = mongoose.model('File', fileSchema);