const express = require('express');
const router = express.Router();
const Author = require('../models/Author');

// GET all authors
router.get('/', async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET a specific author by ID
router.get('/:author_id', async (req, res) => {
  try {
    const author = await Author.findOne({ author_id: req.params.author_id });
    if (!author) return res.status(404).json({ error: 'Author not found' });
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new author
router.post('/', async (req, res) => {
  try {
    const { name, contact_numbers } = req.body;
    const author = new Author({
      author_id: `AUTH${Date.now()}`,
      name,
      contact_numbers,
    });
    await author.save();
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// PUT to update an author
router.put('/:author_id', async (req, res) => {
  try {
    const { name, contact_numbers } = req.body;
    const author = await Author.findOneAndUpdate(
      { author_id: req.params.author_id },
      { name, contact_numbers },
      { new: true }
    );
    if (!author) return res.status(404).json({ error: 'Author not found' });
    res.json(author);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// DELETE an author
router.delete('/:author_id', async (req, res) => {
  try {
    const author = await Author.findOneAndDelete({ author_id: req.params.author_id });
    if (!author) return res.status(404).json({ error: 'Author not found' });
    res.json({ message: 'Author deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;