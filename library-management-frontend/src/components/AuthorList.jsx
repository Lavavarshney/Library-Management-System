import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PlusCircle, Edit, Trash2, Loader, Users } from 'lucide-react';

function AuthorList() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/authors');
        setAuthors(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching authors:', error);
        setLoading(false);
      }
    };
    fetchAuthors();
  }, []);

  const handleDelete = async (author_id) => {
    if (window.confirm('Are you sure you want to delete this author?')) {
      try {
        await axios.delete(`http://localhost:5000/api/authors/${author_id}`);
        setAuthors(authors.filter(author => author.author_id !== author_id));
      } catch (error) {
        alert('Error deleting author');
      }
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64 bg-gray-900 text-gray-200">
      <Loader size={24} className="animate-spin mr-2" />
      <span>Loading authors data...</span>
    </div>
  );

  return (
    <div className="max-w-8xl mx-auto p-6 bg-gray-900 text-gray-200 min-h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Author Management</h1>
          <p className="text-gray-400 mt-1">Browse and manage your library authors</p>
        </div>
        <Link 
          to="/authors/new" 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          <PlusCircle size={20} />
          <span>Add Author</span>
        </Link>
      </div>

      {/* Authors Table */}
      <div className="bg-gray-800 rounded-lg shadow mb-8 overflow-hidden">
        <div className="p-6 border-b border-gray-700 flex items-center">
          <div className="bg-gray-700 p-3 rounded-full mr-4">
            <Users className="text-blue-400" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Author Collection</h2>
            <p className="text-gray-400 text-sm">Total Authors: {authors.length}</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-750">
                <th className="p-4 text-left text-gray-400 font-medium">Name</th>
                <th className="p-4 text-left text-gray-400 font-medium">Contact Numbers</th>
                <th className="p-4 text-left text-gray-400 font-medium">Books Published</th>
                <th className="p-4 text-left text-gray-400 font-medium">Biography</th>
                <th className="p-4 text-left text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {authors.length > 0 ? (
                authors.map(author => (
                  <tr key={author.author_id} className="border-t border-gray-700 hover:bg-gray-750">
                    <td className="p-4">
                      <Link to={`/authors/${author.author_id}`} className="text-blue-400 hover:text-blue-300 font-medium">
                        {author.name}
                      </Link>
                    </td>
                    <td className="p-4">
                      {author.contact_numbers && author.contact_numbers.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {author.contact_numbers.map((num, index) => (
                            <span key={index} className="bg-gray-700 px-2 py-1 rounded-full text-xs">
                              {num}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500 italic">No contact information</span>
                      )}
                    </td>
                    <td className="p-4 text-gray-300">
                      {author.books_count || 0}
                    </td>
                    <td className="p-4 text-gray-300">
                      {author.biography ? (
                        author.biography.length > 50 ? 
                          `${author.biography.substring(0, 50)}...` : 
                          author.biography
                      ) : (
                        <span className="text-gray-500 italic">No biography available</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-3">
                        <Link 
                          to={`/authors/${author.author_id}/edit`} 
                          className="flex items-center text-green-400 hover:text-green-300"
                        >
                          <Edit size={16} className="mr-1" /> Edit
                        </Link>
                        <button 
                          onClick={() => handleDelete(author.author_id)} 
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
                  <td colSpan="5" className="p-4 text-center text-gray-400">No authors found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
        <p>© {new Date().getFullYear()} Library Management System</p>
      </div>
    </div>
  );
}

export default AuthorList;