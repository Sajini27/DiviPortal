const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  serviceId: { type: String, required: true },
  nameWithInitials: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  files: [
    {
      name: { type: String, required: true },  // Document type (e.g., 'birthCertificate')
      path: { type: String, required: true }   // File storage path
    }
  ],
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'], // Restrict to these values
    default: 'Pending', // Default status when submitted
  },
  createdAt: { type: Date, default: Date.now }
});

// Define the model **before** calling dropIndex
const Upload = mongoose.model('Upload', uploadSchema);

// Drop the unique index on `email` if it exists
Upload.collection.dropIndex("email_1").catch(err => console.log("No email index found"));

module.exports = Upload;