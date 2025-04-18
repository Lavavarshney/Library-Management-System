import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, Loader, Save, ArrowLeft, Tag, DollarSign, Building, Users, Check } from 'lucide-react';

function BookForm() {
  const { book_id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    category: '',
    price: '',
    available: true,
    publication_id: '',
    author_ids: [],
  });
  const [publications, setPublications] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(!!book_id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pubRes, authRes] = await Promise.all([
          axios.get('http://localhost:5000/api/publications'),
          axios.get('http://localhost:5000/api/authors'),
        ]);
        setPublications(pubRes.data);
        setAuthors(authRes.data);
        if (book_id) {
          const bookRes = await axios.get(`http://localhost:5000/api/books/${book_id}`);
          setBook({
            title: bookRes.data.title,
            category: bookRes.data.category,
            price: bookRes.data.price,
            available: bookRes.data.available,
            publication_id: bookRes.data.publication.publication_id,
            author_ids: bookRes.data.authors.map(a => a.author_id),
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [book_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (book_id) {
        await axios.put(`http://localhost:5000/api/books/${book_id}`, book);
      } else {
        await axios.post('http://localhost:5000/api/books', book);
      }
      navigate('/books')
    } catch (error) {
      alert('Error saving book');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64 bg-gray-900 text-gray-200">
      <Loader size={24} className="animate-spin mr-2" />
      <span>Loading book data...</span>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-gray-200 min-h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{book_id ? 'Edit Book' : 'Add Book'}</h1>
          <p className="text-gray-400 mt-1">{book_id ? 'Update book information' : 'Add a new book to the library'}</p>
        </div>
        <Link 
          to="/books" 
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
        >
          <ArrowLeft size={20} />
          <span>Back to Books</span>
        </Link>
      </div>

      {/* Form Card */}
      <div className="bg-gray-800 rounded-lg shadow mb-8 overflow-hidden">
        <div className="p-6 border-b border-gray-700 flex items-center">
          <div className="bg-gray-700 p-3 rounded-full mr-4">
            <BookOpen className="text-blue-400" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Book Details</h2>
            <p className="text-gray-400 text-sm">Enter all required book information</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-gray-300 mb-2 font-medium">Title</label>
            <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
              <div className="bg-gray-600 p-3">
                <BookOpen size={20} className="text-gray-300" />
              </div>
              <input
                type="text"
                value={book.title}
                onChange={e => setBook({ ...book, title: e.target.value })}
                className="bg-gray-700 text-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter book title"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Category</label>
              <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
                <div className="bg-gray-600 p-3">
                  <Tag size={20} className="text-gray-300" />
                </div>
                <input
                  type="text"
                  value={book.category}
                  onChange={e => setBook({ ...book, category: e.target.value })}
                  className="bg-gray-700 text-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter category"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Price</label>
              <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
                <div className="bg-gray-600 p-3">
                  <DollarSign size={20} className="text-gray-300" />
                </div>
                <input
                  type="number"
                  value={book.price}
                  onChange={e => setBook({ ...book, price: e.target.value })}
                  className="bg-gray-700 text-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter price"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={book.available}
                onChange={e => setBook({ ...book, available: e.target.checked })}
                className="form-checkbox h-5 w-5 text-blue-500 mr-3"
              />
              <span className="text-gray-300 font-medium">Book is currently available</span>
            </label>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-300 mb-2 font-medium">Publication</label>
            <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
              <div className="bg-gray-600 p-3">
                <Building size={20} className="text-gray-300" />
              </div>
              <select
                value={book.publication_id}
                onChange={e => setBook({ ...book, publication_id: e.target.value })}
                className="bg-gray-700 text-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Publication</option>
                {publications.map(pub => (
                  <option key={pub.publication_id} value={pub.publication_id}>{pub.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-300 mb-2 font-medium">Authors</label>
            <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
              <div className="bg-gray-600 p-3">
                <Users size={20} className="text-gray-300" />
              </div>
              <select
                multiple
                value={book.author_ids}
                onChange={e => setBook({ ...book, author_ids: Array.from(e.target.selectedOptions, opt => opt.value) })}
                className="bg-gray-700 text-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-32"
              >
                {authors.map(author => (
                  <option key={author.author_id} value={author.author_id}>{author.name}</option>
                ))}
              </select>
            </div>
            <p className="text-gray-400 text-sm mt-1">Hold Ctrl/Cmd to select multiple authors</p>
          </div>
          
          <div className="flex justify-end">
            <Link 
              to="/books" 
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium mr-3"
            >
              Cancel
            </Link>
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center"
            >
              <Save size={18} className="mr-2" />
              Save Book
            </button>
          </div>
        </form>
      </div>

      {/* Tips Section */}
      <div className="bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-white mb-4">Tips for Book Registration</h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start">
            <div className="text-blue-400 mr-2">•</div>
            <div>Enter a descriptive title that makes the book easy to find.</div>
          </li>
          <li className="flex items-start">
            <div className="text-blue-400 mr-2">•</div>
            <div>Use standard categories to help with filtering and organization.</div>
          </li>
          <li className="flex items-start">
            <div className="text-blue-400 mr-2">•</div>
            <div>If an author or publisher isn't in the list, you'll need to add them first in their respective sections.</div>
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

export default BookForm;