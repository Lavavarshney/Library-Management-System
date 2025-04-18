import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Book, PlusCircle, Search, Edit, Trash2, Loader, Filter, BookOpen } from 'lucide-react';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    author: '',
    available: false,
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const params = {
          q: searchQuery,
          category: filters.category,
          author: filters.author,
          available: filters.available ? true : undefined,
        };
        const response = await axios.get('http://localhost:5000/api/books/search', { params });
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };
    fetchBooks();
  }, [searchQuery, filters]);

  const handleDelete = async (book_id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`http://localhost:5000/api/books/${book_id}`);
        setBooks(books.filter(book => book.book_id !== book_id));
      } catch (error) {
        alert('Error deleting book');
      }
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64 bg-gray-900 text-gray-200">
      <Loader size={24} className="animate-spin mr-2" />
      <span>Loading books data...</span>
    </div>
  );

  return (
    <div className="max-w-8xl mx-auto p-6 bg-gray-900 text-gray-200 min-h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Book Management</h1>
          <p className="text-gray-400 mt-1">Browse and manage your library collection</p>
        </div>
        <Link 
          to="/books/new" 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          <PlusCircle size={20} />
          <span>Add Book</span>
        </Link>
      </div>

      {/* Search & Filter Section */}
      <div className="bg-gray-800 rounded-lg shadow mb-6 p-6">
        <div className="flex items-center mb-4">
          <div className="bg-gray-700 p-3 rounded-full mr-4">
            <Search className="text-blue-400" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Search Library</h2>
            <p className="text-gray-400 text-sm">Find books by title, author, or category</p>
          </div>
          <button 
            className="ml-auto flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} />
            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
        </div>
        
        <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden mb-4">
          <div className="bg-gray-600 p-3">
            <Search size={20} className="text-gray-300" />
          </div>
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="bg-gray-700 text-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-750 p-4 rounded-lg">
            <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Filter by category"
                value={filters.category}
                onChange={e => setFilters({ ...filters, category: e.target.value })}
                className="bg-gray-700 text-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Filter by author"
                value={filters.author}
                onChange={e => setFilters({ ...filters, author: e.target.value })}
                className="bg-gray-700 text-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer text-gray-300">
                <input
                  type="checkbox"
                  checked={filters.available}
                  onChange={e => setFilters({ ...filters, available: e.target.checked })}
                  className="form-checkbox h-5 w-5 text-blue-500 rounded mr-2"
                />
                Available Books Only
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Books Table */}
      <div className="bg-gray-800 rounded-lg shadow mb-8 overflow-hidden">
        <div className="p-6 border-b border-gray-700 flex items-center">
          <div className="bg-gray-700 p-3 rounded-full mr-4">
            <BookOpen className="text-blue-400" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Book Collection</h2>
            <p className="text-gray-400 text-sm">Total Books: {books.length}</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-750">
                <th className="p-4 text-left text-gray-400 font-medium">Title</th>
                <th className="p-4 text-left text-gray-400 font-medium">Category</th>
                <th className="p-4 text-left text-gray-400 font-medium">Price</th>
                <th className="p-4 text-left text-gray-400 font-medium">Available</th>
                <th className="p-4 text-left text-gray-400 font-medium">Publisher</th>
                <th className="p-4 text-left text-gray-400 font-medium">Authors</th>
                <th className="p-4 text-left text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map(book => (
                  <tr key={book.book_id} className="border-t border-gray-700 hover:bg-gray-750">
                    <td className="p-4">
                      <Link to={`/books/${book.book_id}`} className="text-blue-400 hover:text-blue-300 font-medium">
                        {book.title}
                      </Link>
                    </td>
                    <td className="p-4 text-gray-300">{book.category}</td>
                    <td className="p-4 text-gray-300">${book.price}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${book.available ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                        {book.available ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td className="p-4 text-gray-300">{book.publication.name}</td>
                    <td className="p-4 text-gray-300">{book.authors.map(a => a.name).join(', ')}</td>
                    <td className="p-4">
                      <div className="flex space-x-3">
                        <Link 
                          to={`/books/${book.book_id}/edit`} 
                          className="flex items-center text-green-400 hover:text-green-300"
                        >
                          <Edit size={16} className="mr-1" /> Edit
                        </Link>
                        <button 
                          onClick={() => handleDelete(book.book_id)} 
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
                  <td colSpan="7" className="p-4 text-center text-gray-400">No books found matching your search criteria</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick tips */}
      <div className="bg-gray-800 rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-white">Book Management Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-750 p-4 rounded-lg">
            <h3 className="font-medium text-white mb-2">Quick Search</h3>
            <p className="text-gray-400 text-sm">Use the search bar to quickly find books by title, author name, or category.</p>
          </div>
          <div className="bg-gray-750 p-4 rounded-lg">
            <h3 className="font-medium text-white mb-2">Advanced Filtering</h3>
            <p className="text-gray-400 text-sm">Combine multiple filters to narrow down your search results.</p>
          </div>
          <div className="bg-gray-750 p-4 rounded-lg">
            <h3 className="font-medium text-white mb-2">Managing Inventory</h3>
            <p className="text-gray-400 text-sm">Use the availability filter to quickly identify books that are currently in stock.</p>
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

export default BookList;