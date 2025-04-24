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
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  createdAt: { type: Date, default: Date.now }
});
const Upload = mongoose.model('Upload', uploadSchema);


Upload.collection.dropIndex("email_1").catch(err => console.log("No email index found"));

module.exports = Upload;