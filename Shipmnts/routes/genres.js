const express = require('express');
const router = express.Router();
const Genre = require('../models/Genres');

// Create a new genre
router.post('/genres', async (req, res) => {
  try {
    const newGenre = new Genre({ name: req.body.name });
    const savedGenre = await newGenre.save();
    res.status(201).json(savedGenre);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create genre' });
  }
});

module.exports = router;