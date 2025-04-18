import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, Plus, Save, ArrowLeft, Loader, X } from 'lucide-react';

function PublicationForm() {
  const { publication_id } = useParams();
  const navigate = useNavigate();

  const [publication, setPublication] = useState({ 
    name: '', 
    address: '', 
    contact_numbers: [''] 
  });
  const [loading, setLoading] = useState(!!publication_id);

  useEffect(() => {
    if (publication_id) {
      axios.get(`http://localhost:5000/api/publications/${publication_id}`)
        .then(response => {
          setPublication({
            name: response.data.name,
            address: response.data.address,
            contact_numbers: response.data.contact_numbers.length ? response.data.contact_numbers : [''],
          });
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching publication:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [publication_id]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name: publication.name,
        address: publication.address,
        contact_numbers: publication.contact_numbers.filter(num => num.trim() !== ''),
      };
      
      if (publication_id) {
        await axios.put(`http://localhost:5000/api/publications/${publication_id}`, data);
      } else {
        await axios.post('http://localhost:5000/api/publications', data);
      }
      navigate('/publications')
    } catch (error) {
      alert('Error saving publication');
    }
  };

  const handleContactChange = (index, value) => {
    const newContacts = [...publication.contact_numbers];
    newContacts[index] = value;
    setPublication({ ...publication, contact_numbers: newContacts });
  };

  const addContact = () => {
    setPublication({ ...publication, contact_numbers: [...publication.contact_numbers, ''] });
  };

  const removeContact = (index) => {
    if (publication.contact_numbers.length > 1) {
      const newContacts = [...publication.contact_numbers];
      newContacts.splice(index, 1);
      setPublication({ ...publication, contact_numbers: newContacts });
    }
  };

  if (loading) return (
    <div className="max-w-8xl mx-auto p-6 bg-gray-900 text-gray-200 min-h-screen flex justify-center items-center">
      <div className="flex items-center">
        <Loader size={24} className="animate-spin mr-3 text-blue-400" />
        <span className="text-xl">Loading publication data...</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-8xl mx-auto p-6 bg-gray-900 text-gray-200 min-h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            {publication_id ? 'Edit Publication' : 'Add New Publication'}
          </h1>
          <p className="text-gray-400 mt-1">
            {publication_id ? 'Update publisher information' : 'Add a new publisher to your library system'}
          </p>
        </div>
        <Link 
          to="/publications" 
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
        >
          <ArrowLeft size={20} />
          <span>Back to Publications</span>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Card */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="mb-6">
              <label className="block text-gray-300 mb-2 font-medium">Publication Name</label>
              <input
                type="text"
                value={publication.name}
                onChange={e => setPublication({ ...publication, name: e.target.value })}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Enter publisher name"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2 font-medium">Address</label>
              <textarea
                value={publication.address}
                onChange={e => setPublication({ ...publication, address: e.target.value })}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white min-h-24"
                placeholder="Enter complete address"
                required
              />
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-300 font-medium">Contact Numbers</label>
                <button 
                  type="button" 
                  onClick={addContact} 
                  className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Plus size={18} className="mr-1" />
                  <span>Add Contact</span>
                </button>
              </div>
              
              {publication.contact_numbers.map((num, index) => (
                <div key={index} className="flex mb-3">
                  <input
                    type="text"
                    value={num}
                    onChange={e => handleContactChange(index, e.target.value)}
                    className="flex-grow p-3 bg-gray-700 border border-gray-600 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    placeholder="Enter contact number"
                  />
                  {publication.contact_numbers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeContact(index)}
                      className="bg-gray-700 hover:bg-gray-600 text-red-400 p-3 rounded-r border border-l-0 border-gray-600"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-between mt-8">
              <button 
                type="button" 
                onClick={() => navigate('/publications')} 
                className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded font-medium"
              >
                Cancel
              </button>
              
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-medium flex items-center"
              >
                <Save size={18} className="mr-2" />
                {publication_id ? 'Update Publication' : 'Save Publication'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Helper Card */}
        <div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="bg-gray-700 p-3 rounded-full mb-4 inline-block">
              <BookOpen className="text-blue-400" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-4">
              About Publishers
            </h3>
            <div className="text-gray-300 space-y-4">
              <p>
                Publishers are important partners in maintaining your library's collection. Add accurate information to facilitate ordering and communication.
              </p>
              <div className="border-t border-gray-700 pt-4">
                <h4 className="font-medium text-white mb-2">Required Information:</h4>
                <ul className="list-disc pl-5 text-gray-400 space-y-1">
                  <li>Publication name</li>
                  <li>Complete physical address</li>
                  <li>At least one contact number</li>
                </ul>
              </div>
              <div className="border-t border-gray-700 pt-4">
                <h4 className="font-medium text-white mb-2">Tips:</h4>
                <ul className="list-disc pl-5 text-gray-400 space-y-1">
                  <li>Add multiple contact numbers for redundancy</li>
                  <li>Include area codes for phone numbers</li>
                  <li>Verify publisher details before saving</li>
                </ul>
              </div>
            </div>
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

export default PublicationForm;