const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = async () => {
    try {
        // Use environment variable for MongoDB URI or fallback to local database
        const dbURI = process.env.MONGODB_URL || 'mongodb://localhost:27017/fileUploadDB';
        
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDb;
