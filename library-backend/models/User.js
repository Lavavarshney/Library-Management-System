const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: { type: String, unique: true, required: true }, // e.g., STUDENT123, LIBRARIAN001
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  });

module.exports = mongoose.model('User', userSchema);