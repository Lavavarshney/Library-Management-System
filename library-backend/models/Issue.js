const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  issue_id: {
    type: String,
    unique: true,
    required: true,
  },
  student_id: {
    type: String,
    required: true,
    ref: 'Student', // Reference to Student model
  },
  book_id: {
    type: String,
    required: true,
    ref: 'Book', // Reference to Book model
  },
  issue_date: {
    type: Date,
    required: true,
  },
  due_date: {
    type: Date,
    required: true,
  },
  return_date: {
    type: Date,
    default: null,
  },
  fine: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Issue', issueSchema);