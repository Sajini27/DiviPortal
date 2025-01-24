const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    nic: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    division: { type: String, required: true },
    role: { type: String, required: true } // Ensure role is stored in the model
});

// Add a method to compare passwords
userSchema.methods.comparePassword = async function (password) {
    // Compare the password with the hashed password in the database
    return await bcrypt.compare(password, this.password); // Compare hashed password
};

// Hash password before saving the user
userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified or is new
    if (!this.isModified('password')) return next();

    try {
        // Hash the password with salt rounds
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next(); // Proceed to save the user after hashing
    } catch (err) {
        next(err); // Pass any error to the next middleware
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
