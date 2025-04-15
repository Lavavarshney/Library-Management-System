const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET a student by ID
router.get('/:student_id', async (req, res) => {
  try {
    const student = await Student.findOne({ student_id: req.params.student_id });
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new student
router.post('/', async (req, res) => {
  try {
    const { name, semester, address, contact_numbers } = req.body;
    const student = new Student({
      student_id: `STU${Date.now()}`, // Generate unique ID
      name,
      semester,
      address,
      contact_numbers,
    });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// PUT to update a student
router.put('/:student_id', async (req, res) => {
  try {
    const { name, semester, address, contact_numbers } = req.body;
    const student = await Student.findOneAndUpdate(
      { student_id: req.params.student_id },
      { name, semester, address, contact_numbers },
      { new: true }
    );
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// DELETE a student
router.delete('/:student_id', async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ student_id: req.params.student_id });
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;