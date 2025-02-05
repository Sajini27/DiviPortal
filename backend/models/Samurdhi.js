// models/Samurdhi.js
const mongoose = require('mongoose');

const samurdhiSchema = new mongoose.Schema({
  nameWithInitials: { type: String, required: true },
  idNumber: { type: String, required: true },
  hasSamurdhi: { type: Boolean, required: true },
  amount: { type: Number, default: 0 }, // amount in rupees
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Samurdhi', samurdhiSchema);
