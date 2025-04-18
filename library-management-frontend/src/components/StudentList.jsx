import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Users, UserPlus, Edit, Trash2, Loader } from 'lucide-react';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/students')
      .then(response => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (student_id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`http://localhost:5000/api/students/${student_id}`);
        setStudents(students.filter(student => student.student_id !== student_id));
      } catch (error) {
        alert('Error deleting student');
      }
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64 bg-gray-900 text-gray-200">
      <Loader size={24} className="animate-spin mr-2" />
      <span>Loading students data...</span>
    </div>
  );

  return (
    <div className="max-w-8xl mx-auto p-6 bg-gray-900 text-gray-200 min-h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Student Management</h1>
          <p className="text-gray-400 mt-1">View and manage student records</p>
        </div>
        <Link 
          to="/students/new" 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          <UserPlus size={20} />
          <span>Add Student</span>
        </Link>
      </div>

      {/* Students List Table */}
      <div className="bg-gray-800 rounded-lg shadow mb-8 overflow-hidden">
        <div className="p-6 border-b border-gray-700 flex items-center">
          <div className="bg-gray-700 p-3 rounded-full mr-4">
            <Users className="text-blue-400" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Students Directory</h2>
            <p className="text-gray-400 text-sm">Total Students: {students.length}</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-750">
                <th className="p-4 text-left text-gray-400 font-medium">Name</th>
                <th className="p-4 text-left text-gray-400 font-medium">Semester</th>
                <th className="p-4 text-left text-gray-400 font-medium">Contact Numbers</th>
                <th className="p-4 text-left text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map(student => (
                  <tr key={student.student_id} className="border-t border-gray-700 hover:bg-gray-750">
                    <td className="p-4 text-white">{student.name}</td>
                    <td className="p-4 text-gray-300">{student.semester}</td>
                    <td className="p-4 text-gray-300">{student.contact_numbers.join(', ')}</td>
                    <td className="p-4">
                      <div className="flex space-x-3">
                        <Link 
                          to={`/students/${student.student_id}/edit`} 
                          className="flex items-center text-green-400 hover:text-green-300"
                        >
                          <Edit size={16} className="mr-1" /> Edit
                        </Link>
                        <button 
                          onClick={() => handleDelete(student.student_id)} 
                          className="flex items-center text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={16} className="mr-1" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-400">No students found in the system</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Help Section */}
      <div className="bg-gray-800 rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-white">Student Management Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-750 p-4 rounded-lg">
            <h3 className="font-medium text-white mb-2">Adding Students</h3>
            <p className="text-gray-400 text-sm">Click the "Add Student" button to register new students to the system.</p>
          </div>
          <div className="bg-gray-750 p-4 rounded-lg">
            <h3 className="font-medium text-white mb-2">Editing Records</h3>
            <p className="text-gray-400 text-sm">Use the Edit button to update student information and contact details.</p>
          </div>
          <div className="bg-gray-750 p-4 rounded-lg">
            <h3 className="font-medium text-white mb-2">Bulk Operations</h3>
            <p className="text-gray-400 text-sm">To import or export multiple student records, visit the Reports section.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
        <p>© {new Date().getFullYear()} Library Management System</p>
      </div>
    </div>
  );
}

export default StudentList;