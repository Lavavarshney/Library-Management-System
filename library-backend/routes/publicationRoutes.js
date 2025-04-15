const express = require('express');
const router = express.Router();
const Publication = require('../models/Publication');

// GET all publications
router.get('/', async (req, res) => {
  try {
    const publications = await Publication.find();
    res.json(publications);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET a specific publication by ID
router.get('/:publication_id', async (req, res) => {
  try {
    const publication = await Publication.findOne({ publication_id: req.params.publication_id });
    if (!publication) return res.status(404).json({ error: 'Publication not found' });
    res.json(publication);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new publication
router.post('/', async (req, res) => {
  try {
    const { name, address, contact_numbers } = req.body;
    const publication = new Publication({
      publication_id: `PUB${Date.now()}`,
      name,
      address,
      contact_numbers,
    });
    await publication.save();
    res.status(201).json(publication);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// PUT to update a publication
router.put('/:publication_id', async (req, res) => {
  try {
    const { name, address, contact_numbers } = req.body;
    const publication = await Publication.findOneAndUpdate(
      { publication_id: req.params.publication_id },
      { name, address, contact_numbers },
      { new: true }
    );
    if (!publication) return res.status(404).json({ error: 'Publication not found' });
    res.json(publication);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// DELETE a publication
router.delete('/:publication_id', async (req, res) => {
  try {
    const publication = await Publication.findOneAndDelete({ publication_id: req.params.publication_id });
    if (!publication) return res.status(404).json({ error: 'Publication not found' });
    res.json({ message: 'Publication deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;