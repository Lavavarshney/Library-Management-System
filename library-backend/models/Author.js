const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  author_id: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  contact_numbers: [{
    type: String,
  }],
});

module.exports = mongoose.model('Author', authorSchema);