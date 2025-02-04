const express = require('express');
const router = express.Router();
const Samurdhi = require('../models/Samurdhi');

// POST - Add new Samurdhi record
router.post('/', async (req, res) => {
  try {
    const { nameWithInitials, idNumber, hasSamurdhi, amount } = req.body;

    // Basic validation: if hasSamurdhi is true, ensure an amount is provided
    if (!nameWithInitials || !idNumber || (hasSamurdhi && (amount === undefined || amount === null))) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newEntry = new Samurdhi({
      nameWithInitials,
      idNumber,
      hasSamurdhi,
      amount: hasSamurdhi ? amount : 0
    });

    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    console.error("SAMURDHI ROUTE - Error adding record:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET - List all Samurdhi records
router.get('/', async (req, res) => {
  try {
    const entries = await Samurdhi.find().sort({ createdAt: -1 });
    res.status(200).json(entries);
  } catch (error) {
    console.error("SAMURDHI ROUTE - Error fetching records:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// NEW: GET - Search for a Samurdhi record by ID number
router.get('/search/:idNumber', async (req, res) => {
  try {
    const { idNumber } = req.params;
    const entry = await Samurdhi.findOne({ idNumber: idNumber });
    if (!entry) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(entry);
  } catch (error) {
    console.error("SAMURDHI ROUTE - Error searching record:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE - Remove a Samurdhi record by ID
router.delete('/:id', async (req, res) => {
  try {
    const entry = await Samurdhi.findByIdAndDelete(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json({ message: 'Entry deleted successfully' });
  } catch (error) {
    console.error("SAMURDHI ROUTE - Error deleting record:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;