// src/components/AuthorList.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AuthorList() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/authors')
      .then(response => {
        setAuthors(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching authors:', error);
        setLoading(false);
      });
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

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Authors</h1>
        <Link to="/authors/new" className="bg-blue-500 text-white px-4 py-2 rounded">Add Author</Link>
      </div>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Contact Numbers</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.map(author => (
            <tr key={author.author_id}>
              <td className="p-2">{author.name}</td>
              <td className="p-2">{author.contact_numbers.join(', ')}</td>
              <td className="p-2">
                <Link to={`/authors/${author.author_id}/edit`} className="text-green-500 mr-2">Edit</Link>
                <button onClick={() => handleDelete(author.author_id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AuthorList;