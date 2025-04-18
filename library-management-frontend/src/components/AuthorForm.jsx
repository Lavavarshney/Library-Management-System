import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { User, Phone, Save, ArrowLeft, PlusCircle, X, Loader, ChevronLeft, BookOpen } from 'lucide-react';

function AuthorForm() {
  const { author_id } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState({ name: '', contact_numbers: [''] });
  const [loading, setLoading] = useState(!!author_id);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (author_id) {
      axios.get(`http://localhost:5000/api/authors/${author_id}`)
        .then(response => {
          setAuthor({
            name: response.data.name,
            contact_numbers: response.data.contact_numbers.length ? response.data.contact_numbers : [''],
          });
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching author:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [author_id]);

  const validate = () => {
    const newErrors = {};
    if (!author.name.trim()) {
      newErrors.name = 'Author name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      setIsSaving(true);
      const data = {
        name: author.name,
        contact_numbers: author.contact_numbers.filter(num => num.trim() !== ''),
      };
      
      if (author_id) {
        await axios.put(`http://localhost:5000/api/authors/${author_id}`, data);
      } else {
        await axios.post('http://localhost:5000/api/authors', data);
      }
      
      navigate('/authors');
    } catch (error) {
      alert('Error saving author');
      setIsSaving(false);
    }
  };

  const handleContactChange = (index, value) => {
    const newContacts = [...author.contact_numbers];
    newContacts[index] = value;
    setAuthor({ ...author, contact_numbers: newContacts });
  };

  const addContact = () => {
    setAuthor({ ...author, contact_numbers: [...author.contact_numbers, ''] });
  };

  const removeContact = (index) => {
    const newContacts = [...author.contact_numbers];
    newContacts.splice(index, 1);
    if (newContacts.length === 0) {
      newContacts.push('');
    }
    setAuthor({ ...author, contact_numbers: newContacts });
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64 bg-gray-900 text-gray-200">
      <Loader size={24} className="animate-spin mr-2" />
      <span>Loading author data...</span>
    </div>
  );

  return (
    <div className="max-w-8xl mx-auto p-6 bg-gray-900 text-gray-200 min-h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{author_id ? 'Edit Author' : 'Add New Author'}</h1>
          <p className="text-gray-400 mt-1">{author_id ? 'Update author information' : 'Create a new author entry'}</p>
        </div>
        <Link 
          to="/authors" 
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <ChevronLeft size={20} />
          <span>Back to Authors</span>
        </Link>
      </div>

      {/* Author Form Section */}
      <div className="bg-gray-800 rounded-lg shadow mb-8 overflow-hidden">
        <div className="p-6 border-b border-gray-700 flex items-center">
          <div className="bg-blue-600 p-3 rounded-full mr-4">
            <User className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Author Details</h2>
            <p className="text-gray-400 text-sm">Enter author information below</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-gray-300 font-medium mb-2">Author Name</label>
            <input
              type="text"
              value={author.name}
              onChange={e => setAuthor({ ...author, name: e.target.value })}
              className={`w-full bg-gray-700 text-white p-3 rounded-lg border ${
                errors.name ? 'border-red-500' : 'border-gray-600'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter author's full name"
            />
            {errors.name && (
              <p className="mt-2 text-red-400 text-sm">{errors.name}</p>
            )}
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-300 font-medium">Contact Numbers</label>
              <button 
                type="button" 
                onClick={addContact} 
                className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
              >
                <PlusCircle className="mr-1" size={16} />
                Add Number
              </button>
            </div>
            
            {author.contact_numbers.map((num, index) => (
              <div key={index} className="flex mb-3">
                <div className="bg-gray-600 px-3 flex items-center rounded-l-lg">
                  <Phone size={16} className="text-gray-300" />
                </div>
                <input
                  type="text"
                  value={num}
                  onChange={e => handleContactChange(index, e.target.value)}
                  className="flex-grow bg-gray-700 text-white p-3 border-y border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter contact number"
                />
                <button 
                  type="button" 
                  onClick={() => removeContact(index)}
                  className="bg-gray-600 hover:bg-red-700 text-white px-3 rounded-r-lg transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-gray-750 p-4 rounded-lg mb-6">
            <h3 className="font-medium text-white mb-2 flex items-center">
              <BookOpen size={16} className="mr-2" />
              Author Information Tips
            </h3>
            <ul className="text-gray-400 text-sm list-disc pl-5 space-y-1">
              <li>Enter the author's full name as it appears on their publications</li>
              <li>Add all relevant contact numbers, including international codes if applicable</li>
              <li>Authors with multiple publications should have consistent naming</li>
            </ul>
          </div>

          <div className="flex justify-between pt-4 border-t border-gray-700">
            <Link 
              to="/authors" 
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Cancel
            </Link>
            <button 
              type="submit" 
              disabled={isSaving}
              className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center ${
                isSaving ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSaving && <Loader size={16} className="animate-spin mr-2" />}
              {author_id ? 'Update Author' : 'Save Author'}
            </button>
          </div>
        </form>
      </div>

      {/* Quick Reference Section */}
      {!author_id && (
        <div className="bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">Author Management Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-750 p-4 rounded-lg">
              <h3 className="font-medium text-white mb-2">Author Names</h3>
              <p className="text-gray-400 text-sm">Use the full name of the author as it appears in their publications for consistency.</p>
            </div>
            <div className="bg-gray-750 p-4 rounded-lg">
              <h3 className="font-medium text-white mb-2">Contact Information</h3>
              <p className="text-gray-400 text-sm">Include multiple contact methods to ensure you can reach the author when needed.</p>
            </div>
            <div className="bg-gray-750 p-4 rounded-lg">
              <h3 className="font-medium text-white mb-2">Author Records</h3>
              <p className="text-gray-400 text-sm">Maintain accurate author records to facilitate book management and cataloging.</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
        <p>© {new Date().getFullYear()} Library Management System</p>
      </div>
    </div>
  );
}

export default AuthorForm;