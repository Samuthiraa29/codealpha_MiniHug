const express = require('express');
const Toy = require('../models/Toy');
const router = express.Router();

// Get all toys
router.get('/', async (req, res) => {
  try {
    const toys = await Toy.find();
    res.json(toys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a toy (admin only, but for simplicity)
router.post('/', async (req, res) => {
  try {
    const toy = new Toy(req.body);
    await toy.save();
    res.status(201).json(toy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
