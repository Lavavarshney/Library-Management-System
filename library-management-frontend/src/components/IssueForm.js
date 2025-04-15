import React, { useState } from 'react';
import axios from 'axios';

const IssueForm = () => {
  const [formData, setFormData] = useState({
    student_id: '',
    book_id: '',
    issue_date: '',
    due_date: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post issue to backend
      await axios.post('http://localhost:5000/api/issues', formData);
      alert('Book issued successfully');
    } catch (error) {
      alert('Error issuing book: ' + error.response.data.error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Issue a Book</h2>
      <input
        type="text"
        name="student_id"
        placeholder="Student ID"
        value={formData.student_id}
        onChange={handleChange}
      />
      <input
        type="text"
        name="book_id"
        placeholder="Book ID"
        value={formData.book_id}
        onChange={handleChange}
      />
      <input
        type="date"
        name="issue_date"
        value={formData.issue_date}
        onChange={handleChange}
      />
      <input
        type="date"
        name="due_date"
        value={formData.due_date}
        onChange={handleChange}
      />
      <button type="submit">Issue Book</button>
    </form>
  );
};

export default IssueForm;