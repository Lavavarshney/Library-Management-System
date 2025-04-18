import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, Plus, Save, MapPin, Phone, X } from 'lucide-react';

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
    <div className="flex justify-center items-center h-64">
      <div className="text-blue-400 text-xl animate-pulse">Loading publication data...</div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-gray-200">
      <div className="flex items-center mb-6">
        <div className="bg-gray-700 p-3 rounded-full mr-4">
          <BookOpen className="text-blue-400" size={24} />
        </div>
        <h1 className="text-2xl font-bold text-white">
          {publication_id ? 'Edit Publication' : 'Add New Publication'}
        </h1>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="mb-5">
          <label className="block text-gray-300 mb-2 font-medium">Publication Name</label>
          <div className="relative">
            <input
              type="text"
              value={publication.name}
              onChange={e => setPublication({ ...publication, name: e.target.value })}
              className="w-full p-3 pl-10 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="Enter publication name"
              required
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <BookOpen size={18} className="text-gray-500" />
            </div>
          </div>
        </div>
        
        <div className="mb-5">
          <label className="block text-gray-300 mb-2 font-medium">Address</label>
          <div className="relative">
            <textarea
              value={publication.address}
              onChange={e => setPublication({ ...publication, address: e.target.value })}
              className="w-full p-3 pl-10 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white min-h-24"
              placeholder="Enter publication address"
              required
            />
            <div className="absolute top-3 left-3 pointer-events-none">
              <MapPin size={18} className="text-gray-500" />
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-gray-300 font-medium">Contact Numbers</label>
            <button 
              type="button" 
              onClick={addContact} 
              className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Plus size={16} className="mr-1" />
              <span>Add Number</span>
            </button>
          </div>
          
          {publication.contact_numbers.map((num, index) => (
            <div key={index} className="relative mb-3 flex">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Phone size={18} className="text-gray-500" />
              </div>
              <input
                type="text"
                value={num}
                onChange={e => handleContactChange(index, e.target.value)}
                className="w-full p-3 pl-10 bg-gray-700 border border-gray-600 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Enter contact number"
              />
              {publication.contact_numbers.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeContact(index)}
                  className="bg-gray-700 border-l-0 border border-gray-600 rounded-r p-3 text-gray-400 hover:text-red-400"
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
  );
}

export default PublicationForm;