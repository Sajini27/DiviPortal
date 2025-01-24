// Import required packages
const dotenv = require("dotenv"); // Import dotenv at the top
dotenv.config(); // Ensure dotenv is loaded at the start

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require('./routes/auth');
const feedbackRoutes = require('./routes/feedback'); // Import feedback routes

// Create an instance of the express app
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies

// Use the imported routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/feedback', feedbackRoutes); // Feedback routes

// Connect to MongoDB using the URL from .env
const mongoURI = process.env.MONGODB_URL; // Mongo URI from environment variable

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);  // Exit the process if the connection fails
    });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
