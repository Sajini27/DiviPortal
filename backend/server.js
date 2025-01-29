const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const feedbackRoutes = require('./routes/feedback');
const connectDb = require('./config/db');
const authRrouter = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDb();

// Routes
app.use('/api/auth', authRrouter); 
app.use('/api/feedback', feedbackRoutes);

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
