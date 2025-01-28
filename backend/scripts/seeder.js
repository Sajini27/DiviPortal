const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Adjust path to your User model
require('dotenv').config(); // Load environment variables from .env file

// Check if the MONGODB_URL is being read
console.log('MONGODB_URL:', process.env.MONGODB_URL);

const seedUsers = async () => {
    try {
        // Connect to the database
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB');

        // Clear existing users to avoid duplicates or invalid data
        console.log('Clearing existing users...');
        await User.deleteMany({});

        // Create Admin user
        console.log('Creating Admin user...');
        const adminPassword = await bcrypt.hash('admin123', 10);
        await User.create({ name: 'Admin', password: adminPassword, role: 'admin', email: 'admin@example.com' });

        // Create shared Staff account
        console.log('Creating Staff user...');
        const staffPassword = await bcrypt.hash('staff123', 10);
        await User.create({ name: 'Staff', password: staffPassword, role: 'staff', email: 'staff@example.com' });

        // Create Officer accounts
        console.log('Creating Officer users...');
        for (let i = 1; i <= 15; i++) {
            const officerPassword = await bcrypt.hash(`officer${i}Pass`, 10);
            const officerEmail = `officer${i}@example.com`; // Unique email for each officer

            // Check if the officer already exists by email to prevent duplicates
            const existingOfficer = await User.findOne({ email: officerEmail });
            if (!existingOfficer) {
                await User.create({
                    name: `Officer ${i}`,
                    email: officerEmail,
                    password: officerPassword,
                    role: 'officer',
                });
                console.log(`Officer ${i} created`);
            } else {
                console.log(`Officer ${i} already exists, skipping.`);
            }
        }

        console.log('Seeder script executed successfully!');
    } catch (error) {
        console.error('Error running seeder script:', error);
    } finally {
        mongoose.connection.close();
        console.log('MongoDB connection closed');
    }
};

seedUsers();
