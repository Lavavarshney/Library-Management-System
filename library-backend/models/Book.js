const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  book_id: {
    type: String,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  available: {
    type: Boolean,
    default: true,
  },
  publication_id: {
    type: String,
    required: true,
    ref: 'Publication', // Reference to Publication model
  },
  author_ids: [{
    type: String,
    ref: 'Author', // Reference to Author model for WRITES relationship
  }],
});

module.exports = mongoose.model('Book', bookSchema);