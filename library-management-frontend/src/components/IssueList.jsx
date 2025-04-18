import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, ArrowUpRight, Calendar, XCircle } from 'lucide-react';

function IssueList() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returnDate, setReturnDate] = useState('');
  const [showReturnModal, setShowReturnModal] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/issues')
      .then(response => {
        setIssues(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching issues:', error);
        setLoading(false);
      });
  }, []);

  const handleReturn = async (issue_id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/issues/${issue_id}/return`, {
        return_date: returnDate,
      });
      setIssues(issues.map(issue => 
        issue.issue_id === issue_id ? { ...issue, ...response.data } : issue
      ));
      setShowReturnModal(null);
      setReturnDate('');
    } catch (error) {
      alert('Error returning book');
    }
  };

  const getStatusColor = (issue) => {
    if (issue.return_date) return "bg-green-900 text-green-200";
    
    const today = new Date();
    const dueDate = new Date(issue.due_date);
    
    if (dueDate < today) return "bg-red-900 text-red-200";
    
    const threeDaysMS = 3 * 24 * 60 * 60 * 1000;
    if ((dueDate - today) < threeDaysMS) return "bg-amber-900 text-amber-200";
    
    return "bg-blue-900 text-blue-200";
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64 text-blue-400 text-xl">
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
          <h1 className="text-2xl font-bold text-white">Book Issues</h1>
        </div>
        <Link 
          to="/issues/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
        >
          <ArrowUpRight size={18} className="mr-2" />
          Issue Book
        </Link>
      </div>
      
      <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700 text-left">
                <th className="p-3 text-gray-300 font-medium">Book</th>
                <th className="p-3 text-gray-300 font-medium">Student</th>
                <th className="p-3 text-gray-300 font-medium">Issue Date</th>
                <th className="p-3 text-gray-300 font-medium">Due Date</th>
                <th className="p-3 text-gray-300 font-medium">Return Date</th>
                <th className="p-3 text-gray-300 font-medium">Fine</th>
                <th className="p-3 text-gray-300 font-medium">Status</th>
                <th className="p-3 text-gray-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {issues.map(issue => (
                <tr key={issue.issue_id} className="hover:bg-gray-750">
                  <td className="p-3">{issue.book?.title || 'Unknown Book'}</td>
                  <td className="p-3">{issue.student?.name || 'Unknown Student'}</td>
                  <td className="p-3">{new Date(issue.issue_date).toLocaleDateString()}</td>
                  <td className="p-3">{new Date(issue.due_date).toLocaleDateString()}</td>
                  <td className="p-3">{issue.return_date ? new Date(issue.return_date).toLocaleDateString() : '-'}</td>
                  <td className="p-3">
                    {issue.fine > 0 ? (
                      <span className="text-red-400">${issue.fine}</span>
                    ) : (
                      <span>$0.00</span>
                    )}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(issue)}`}>
                      {issue.return_date ? 'Returned' : 
                        new Date(issue.due_date) < new Date() ? 'Overdue' : 'Active'}
                    </span>
                  </td>
                  <td className="p-3">
                    {!issue.return_date && (
                      <button
                        onClick={() => setShowReturnModal(issue.issue_id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Return
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showReturnModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Calendar className="text-blue-400 mr-2" size={20} />
                Return Book
              </h2>
              <button 
                onClick={() => setShowReturnModal(null)} 
                className="text-gray-400 hover:text-white"
              >
                <XCircle size={20} />
              </button>
            </div>
            
            <p className="text-gray-300 mb-4">Please select the return date and time:</p>
            
            <input
              type="datetime-local"
              value={returnDate}
              onChange={e => setReturnDate(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mb-4"
              required
            />
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowReturnModal(null)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReturn(showReturnModal)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
              >
                <Calendar className="mr-2" size={18} />
                Confirm Return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IssueList;