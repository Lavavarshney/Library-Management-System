const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  student_id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  semester: { type: Number, required: true },
  address: { type: String, required: true },
  contact_numbers: [{ type: String }],
});

module.exports = mongoose.model('Student', studentSchema);