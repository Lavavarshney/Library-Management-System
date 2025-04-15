const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Publication = require('../models/Publication');
const Author = require('../models/Author');
router.get('/', async (req, res) => {
    try {
      const books = await Book.find();
      console.log('Books:', books); // Debug: Check raw book data
      const populatedBooks = await Promise.all(
        books.map(async (book) => {
          const publication = await Publication.findOne({ publication_id: book.publication_id });
          const authors = await Author.find({ author_id: { $in: book.author_ids } });
          console.log(`Book ${book.book_id}:`, { publication, authors }); // Debug
          return {
            ...book._doc,
            publication: publication || { publication_id: book.publication_id }, // Fallback
            authors: authors.length ? authors : book.author_ids.map(id => ({ author_id: id })), // Fallback
          };
        })
      );
      res.json(populatedBooks);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  router.get('/:book_id', async (req, res) => {
    try {
      const book = await Book.findOne({ book_id: req.params.book_id });
      if (!book) return res.status(404).json({ error: 'Book not found' });
      const publication = await Publication.findOne({ publication_id: book.publication_id });
      const authors = await Author.find({ author_id: { $in: book.author_ids } });
      console.log(`Book ${book.book_id}:`, { publication, authors }); // Debug
      res.json({
        ...book._doc,
        publication: publication || { publication_id: book.publication_id },
        authors: authors.length ? authors : book.author_ids.map(id => ({ author_id: id })),
      });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: 'Server error' });
    }
  });
// POST a new book
router.post('/', async (req, res) => {
  try {
    const { title, category, price, available, publication_id, author_ids } = req.body;
    const book = new Book({
      book_id: `BOOK${Date.now()}`,
      title,
      category,
      price,
      available,
      publication_id,
      author_ids,
    });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ error: 'Invalid data' });
  }
});

// PUT to update a book
router.put('/:book_id', async (req, res) => {
  try {
    const { title, category, price, available, publication_id, author_ids } = req.body;
    const book = await Book.findOneAndUpdate(
      { book_id: req.params.book_id },
      { title, category, price, available, publication_id, author_ids },
      { new: true }
    );
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ error: 'Invalid data' });
  }
});

// DELETE a book
router.delete('/:book_id', async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ book_id: req.params.book_id });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted' });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;