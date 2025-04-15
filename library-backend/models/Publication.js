const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
  publication_id: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact_numbers: [{
    type: String,
  }],
});

module.exports = mongoose.model('Publication', publicationSchema);