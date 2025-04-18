import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserPlus, Loader, User, BookOpen, Phone, Save, ArrowLeft,Home, PlusCircle } from 'lucide-react';

function StudentForm() {
  const { student_id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({ name: '', semester: '',address:'', contact_numbers: [''] });
  const [loading, setLoading] = useState(!!student_id);

  useEffect(() => {
    if (student_id) {
      axios.get(`http://localhost:5000/api/students/${student_id}`)
        .then(response => {
          setStudent({
            name: response.data.name,
            semester: response.data.semester,
            address: response.data.address,
            contact_numbers: response.data.contact_numbers.length ? response.data.contact_numbers : [''],
          });
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching student:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [student_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name: student.name,
        semester: Number(student.semester),
        address: student.address,
        contact_numbers: student.contact_numbers.filter(num => num.trim() !== ''),
      };
      
      if (student_id) {
        await axios.put(`http://localhost:5000/api/students/${student_id}`, data);
      } else {
        await axios.post('http://localhost:5000/api/students', data);
        console.log(data);
      }
      navigate('/students');
    } catch (error) {
      console.log(error);
      alert('Error saving student');
    }
  };

  const handleContactChange = (index, value) => {
    const newContacts = [...student.contact_numbers];
    newContacts[index] = value;
    setStudent({ ...student, contact_numbers: newContacts });
  };

  const addContact = () => {
    setStudent({ ...student, contact_numbers: [...student.contact_numbers, ''] });
  };
  const addAddress = () => {
    setStudent({ ...student, contact_numbers: [...student.address, ''] });
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64 bg-gray-900 text-gray-200">
      <Loader size={24} className="animate-spin mr-2" />
      <span>Loading student data...</span>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-gray-200 min-h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{student_id ? 'Edit Student' : 'Add Student'}</h1>
          <p className="text-gray-400 mt-1">{student_id ? 'Update student information' : 'Register a new student'}</p>
        </div>
        <Link 
          to="/students" 
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
        >
          <ArrowLeft size={20} />
          <span>Back to Students</span>
        </Link>
      </div>

      {/* Form Card */}
      <div className="bg-gray-800 rounded-lg shadow mb-8 overflow-hidden">
        <div className="p-6 border-b border-gray-700 flex items-center">
          <div className="bg-gray-700 p-3 rounded-full mr-4">
            {student_id ? <User className="text-blue-400" size={24} /> : <UserPlus className="text-green-400" size={24} />}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Student Details</h2>
            <p className="text-gray-400 text-sm">Enter all required information</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-gray-300 mb-2 font-medium">Name</label>
            <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
              <div className="bg-gray-600 p-3">
                <User size={20} className="text-gray-300" />
              </div>
              <input
                type="text"
                value={student.name}
                onChange={e => setStudent({ ...student, name: e.target.value })}
                className="bg-gray-700 text-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter student name"
                required
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-300 mb-2 font-medium">Semester</label>
            <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
              <div className="bg-gray-600 p-3">
                <BookOpen size={20} className="text-gray-300" />
              </div>
              <input
                type="number"
                value={student.semester}
                onChange={e => setStudent({ ...student, semester: e.target.value })}
                className="bg-gray-700 text-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter semester number"
                required
                min="1"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2 font-medium">Address</label>
            <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
              <div className="bg-gray-600 p-3">
                <Home size={20} className="text-gray-300" />
              </div>
              <input
                type="text"
                value={student.address}
                onChange={e => setStudent({ ...student, address: e.target.value })}
                className="bg-gray-700 text-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter student address"
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-300 font-medium">Contact Numbers</label>
              <button 
                type="button" 
                onClick={addContact} 
                className="flex items-center text-blue-400 hover:text-blue-300"
              >
                <PlusCircle size={16} className="mr-1" /> Add Contact
              </button>
            </div>
            {student.contact_numbers.map((num, index) => (
              <div key={index} className="flex items-center bg-gray-700 rounded-lg overflow-hidden mb-3">
                <div className="bg-gray-600 p-3">
                  <Phone size={20} className="text-gray-300" />
                </div>
                <input
                  type="text"
                  value={num}
                  onChange={e => handleContactChange(index, e.target.value)}
                  className="bg-gray-700 text-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter contact number"
                />
              </div>
            ))}
          </div>
          
          <div className="flex justify-end">
            <Link 
              to="/students" 
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium mr-3"
            >
              Cancel
            </Link>
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center"
            >
              <Save size={18} className="mr-2" />
              Save Student
            </button>
          </div>
        </form>
      </div>

      {/* Tips Section */}
      <div className="bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-white mb-4">Tips for Student Registration</h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start">
            <div className="text-blue-400 mr-2">•</div>
            <div>Enter the student's full name as it appears in official documents.</div>
          </li>
          <li className="flex items-start">
            <div className="text-blue-400 mr-2">•</div>
            <div>The semester should be a numeric value (e.g., 1, 2, 3).</div>
          </li>
          <li className="flex items-start">
            <div className="text-blue-400 mr-2">•</div>
            <div>Add multiple contact numbers for emergency purposes. At least one contact is required.</div>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
        <p>© {new Date().getFullYear()} Library Management System</p>
      </div>
    </div>
  );
}

export default StudentForm;