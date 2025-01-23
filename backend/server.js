// Import required packages
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require('./routes/auth');
const feedbackRoutes = require('./routes/feedback'); // Import feedback routes

// Create an instance of the express app
const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware setup
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies

app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/feedback', feedbackRoutes); // Feedback routes

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://user1:sajini2000@test1.6mxqw.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
