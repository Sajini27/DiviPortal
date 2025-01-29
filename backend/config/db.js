const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = async () => {
    try {
        const dbURI = process.env.MONGODB_URL;
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); 
    }
};

module.exports = connectDb;
