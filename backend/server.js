const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');

// Import all routes
const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDb();

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/feedback', feedbackRoutes); // Feedback routes
app.use('/api/user', userRoutes); // User routes
app.use('/api/upload', uploadRoutes); // File upload routes
app.use('/api/admin', adminRoutes); // Admin routes

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));