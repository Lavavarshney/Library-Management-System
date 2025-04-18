const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');
const Book = require('../models/Book');
const Student = require('../models/Student');
// GET all issues
router.get('/', async (req, res) => {
  try {
    const issues = await Issue.find();
    const populatedIssues = await Promise.all(issues.map(async (issue) => {
      const student = await Student.findOne({ student_id: issue.student_id });
      const book = await Book.findOne({ book_id: issue.book_id });
          return {
        ...issue._doc,
        student,
        book,
        fine: calculateFine(issue.due_date, issue.return_date),
      };
    }));
    res.json(populatedIssues);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new issue (borrow a book)
router.post('/', async (req, res) => {
  try {
    const { student_id, book_id, issue_date, due_date } = req.body;
    const book = await Book.findOne({ book_id });
    if (!book) {
      return res.status(400).json({ error: 'Book not available' });
    }
    const issue = new Issue({
      issue_id: `ISS${Date.now()}`,
      student_id,
      book_id,
      issue_date,
      due_date,
      fine: 0,
    });
    await Book.findOneAndUpdate({ book_id }, { available: false });
    await issue.save();
    res.status(201).json(issue);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// PUT to return a book
router.put('/:issue_id/return', async (req, res) => {
  try {
    const { return_date } = req.body;
    const issue = await Issue.findOne({ issue_id: req.params.issue_id });
    if (!issue) return res.status(404).json({ error: 'Issue not found' });
    const fine = calculateFine(issue.due_date, new Date(return_date));
    const updatedIssue = await Issue.findOneAndUpdate(
      { issue_id: req.params.issue_id },
      { return_date, fine },
      { new: true }
    );
    await Book.findOneAndUpdate({ book_id: issue.book_id }, { available: true });
    res.json(updatedIssue);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

function calculateFine(due_date, return_date) {
  if (!return_date || return_date <= due_date) return 0;
  const daysLate = Math.ceil((return_date - due_date) / (1000 * 60 * 60 * 24));
  return daysLate * 1; // $1 per day
}

module.exports = router;