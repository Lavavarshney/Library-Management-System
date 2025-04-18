import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, ArrowLeft, Calendar, Clock, User, Book } from 'lucide-react';

function IssueForm() {
  const navigate = useNavigate();
  const [issue, setIssue] = useState({
    student_id: '',
    book_id: '',
    issue_date: new Date().toISOString().slice(0, 16),
    due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
  });
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, booksRes] = await Promise.all([
          axios.get('http://localhost:5000/api/students'),
          axios.get('http://localhost:5000/api/books'),
        ]);
        setStudents(studentsRes.data);
        setBooks(booksRes.data.filter(b => b.available));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/issues', {
        student_id: issue.student_id,
        book_id: issue.book_id,
        issue_date: issue.issue_date,
        due_date: issue.due_date,
      });
      navigate('/issues');
    } catch (error) {
      alert(error.response?.data?.error || 'Error issuing book');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64 text-blue-400 text-xl bg-gray-900">
      Loading...
    </div>
  );

  return (
    <div className="p-6 bg-gray-900 text-gray-200 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="bg-gray-700 p-3 rounded-full mr-4">
            <BookOpen className="text-blue-400" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-white">Issue New Book</h1>
        </div>
        <Link 
          to="/issues" 
          className="flex items-center text-gray-400 hover:text-gray-200"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Issues
        </Link>
      </div>

      <div className="bg-gray-800 rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center">
                <User size={16} className="mr-2 text-blue-400" />
                Student
              </label>
              <select
                value={issue.student_id}
                onChange={e => setIssue({ ...issue, student_id: e.target.value })}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                required
              >
                <option value="">Select Student</option>
                {students.map(student => (
                  <option key={student.student_id} value={student.student_id}>{student.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center">
                <Book size={16} className="mr-2 text-green-400" />
                Book
              </label>
              <select
                value={issue.book_id}
                onChange={e => setIssue({ ...issue, book_id: e.target.value })}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                required
              >
                <option value="">Select Book</option>
                {books.map(book => (
                  <option key={book.book_id} value={book.book_id}>{book.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center">
                <Calendar size={16} className="mr-2 text-purple-400" />
                Issue Date
              </label>
              <input
                type="datetime-local"
                value={issue.issue_date}
                onChange={e => setIssue({ ...issue, issue_date: e.target.value })}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center">
                <Clock size={16} className="mr-2 text-amber-400" />
                Due Date
              </label>
              <input
                type="datetime-local"
                value={issue.due_date}
                onChange={e => setIssue({ ...issue, due_date: e.target.value })}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                required
              />
            </div>
          </div>

          <div className="bg-gray-750 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-medium text-white mb-2">Issue Summary</h3>
            <p className="text-gray-300 text-sm mb-1">
              {issue.student_id ? `Student: ${students.find(s => s.student_id === issue.student_id)?.name || 'Not selected'}` : 'Student: Not selected'}
            </p>
            <p className="text-gray-300 text-sm mb-1">
              {issue.book_id ? `Book: ${books.find(b => b.book_id === issue.book_id)?.title || 'Not selected'}` : 'Book: Not selected'}
            </p>
            <p className="text-gray-300 text-sm">
              {issue.due_date ? `Return By: ${new Date(issue.due_date).toLocaleDateString()}` : 'Return By: Not set'}
            </p>
          </div>

          <div className="flex justify-end">
            <Link 
              to="/issues" 
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded mr-3"
            >
              Cancel
            </Link>
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded flex items-center"
            >
              <BookOpen size={18} className="mr-2" />
              Issue Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default IssueForm;