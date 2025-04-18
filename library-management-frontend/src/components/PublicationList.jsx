import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Book, Trash2, Edit, PlusCircle, Loader } from 'lucide-react';

function PublicationList() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/publications')
      .then(response => {
        setPublications(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching publications:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (publication_id) => {
    if (window.confirm('Are you sure you want to delete this publication?')) {
      try {
        await axios.delete(`http://localhost:5000/api/publications/${publication_id}`);
        setPublications(publications.filter(pub => pub.publication_id !== publication_id));
      } catch (error) {
        alert('Error deleting publication');
      }
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64 text-gray-200">
      <Loader size={24} className="animate-spin mr-2" />
      <span>Loading publications...</span>
    </div>
  );

  return (
    <div className="max-w-8xl mx-auto p-6 bg-gray-900 text-gray-200 min-h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Publications</h1>
          <p className="text-gray-400 mt-1">Manage book publishers and suppliers</p>
        </div>
        <div>
          <Link 
            to="/publications/new" 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <PlusCircle size={20} />
            <span>Add Publication</span>
          </Link>
        </div>
      </div>

      {/* Publications Table */}
      <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700 text-left">
                <th className="p-4 font-semibold text-gray-200">Name</th>
                <th className="p-4 font-semibold text-gray-200">Address</th>
                <th className="p-4 font-semibold text-gray-200">Contact Numbers</th>
                <th className="p-4 font-semibold text-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {publications.length > 0 ? (
                publications.map(pub => (
                  <tr key={pub.publication_id} className="border-t border-gray-700 hover:bg-gray-750 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="bg-gray-700 p-2 rounded-full mr-3">
                          <Book className="text-blue-400" size={18} />
                        </div>
                        <span>{pub.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-300">{pub.address}</td>
                    <td className="p-4 text-gray-300">{pub.contact_numbers.join(', ')}</td>
                    <td className="p-4">
                      <div className="flex gap-3">
                        <Link 
                          to={`/publications/${pub.publication_id}/edit`} 
                          className="text-green-400 hover:text-green-300 flex items-center transition-colors"
                        >
                          <Edit size={18} />
                          <span className="ml-1">Edit</span>
                        </Link>
                        <button 
                          onClick={() => handleDelete(pub.publication_id)} 
                          className="text-red-400 hover:text-red-300 flex items-center transition-colors"
                        >
                          <Trash2 size={18} />
                          <span className="ml-1">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-400">
                    No publications found. Add one to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State - Show when no publications */}
      {publications.length === 0 && (
        <div className="mt-8 bg-gray-800 rounded-lg p-8 text-center border border-dashed border-gray-700">
          <div className="bg-gray-700 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Book className="text-blue-400" size={28} />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">No Publications Added Yet</h3>
          <p className="text-gray-400 mb-6">Add publishers and suppliers to manage your book inventory</p>
          <Link 
            to="/publications/new" 
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <PlusCircle size={20} />
            <span>Add Your First Publication</span>
          </Link>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
        <p>© {new Date().getFullYear()} Library Management System</p>
      </div>
    </div>
  );
}

export default PublicationList;