const Notification = require('../models/Notification');
const Upload = require('../models/upload');
const User = require('../models/user');

exports.uploadFiles = async (req, res) => {
  try {
    const { nameWithInitials, email, contactNumber, uid, serviceId } = req.body;
    const uploadedFiles = [];

    if (req.files) {
      Object.entries(req.files).forEach(([key, fileArray]) => {
        const file = fileArray[0];
        const relativePath = `uploads/${file.filename}`;
        uploadedFiles.push({ name: key, path: relativePath });
      });
    }

    const upload = new Upload({
      nameWithInitials,
      email,
      contactNumber,
      uid,
      serviceId,
      files: uploadedFiles,
    });

    await upload.save();

    // Determine the division based on serviceId
    const divisionMap = {
      'amendent@': 'Civil Registration',
      // Add other serviceId-to-division mappings as needed
    };
    const division = divisionMap[serviceId] || 'Unknown';

// Determine the path based on serviceId
    const pathMap = {
      'amendent@': '/civilRegistration/birthCertificate/amendment',
    }

    const path = pathMap[serviceId] || 'Unknown';


    // Find staff members in the relevant division
    const staffMembers = await User.find({ role: 'staff', division });

    // Create a notification for each staff member
    const notificationPromises = staffMembers.map((staff) =>
      new Notification({
        staffId: staff._id,
        message: `New form submitted by ${nameWithInitials} for ${serviceId}`,
        relatedId: upload._id,
        serviceId,
        division,
        path,
      }).save()
    );

    await Promise.all(notificationPromises);

    res.status(201).json({ message: 'Form submitted successfully', upload });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving form data', error });
  }
};

exports.getUploadsByServiceId = async (req, res) => {
  try {
    const { serviceId } = req.query;
    const uploads = await Upload.find({ serviceId });
    res.status(200).json(uploads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching uploads", error });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { uploadId } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pending', 'Approved', 'Rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const upload = await Upload.findByIdAndUpdate(
      uploadId,
      { status },
      { new: true }
    );

    if (!upload) {
      return res.status(404).json({ message: 'Upload not found' });
    }

    // Create notification for the user
    const userNotification = new Notification({
      userId: upload.uid, // Assuming uid is the user's _id
      message: `Your amendment application status has been updated to ${status}`,
      relatedId: upload._id,
      serviceId: upload.serviceId,
    });
    await userNotification.save();

    res.status(200).json({ message: 'Status updated successfully', upload });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating status', error });
  }
};

module.exports = {
  uploadFiles: exports.uploadFiles,
  getUploadsByServiceId: exports.getUploadsByServiceId,
  updateStatus: exports.updateStatus,
};