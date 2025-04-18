// src/components/BookDetail.jsx
import  React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function BookDetail() {
  const { book_id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/books/${book_id}`)
      .then(response => {
        setBook(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching book:', error);
        setLoading(false);
      });
  }, [book_id]);

  if (loading) return <div>Loading...</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <div className="bg-white p-6 rounded shadow">
        <p><strong>Category:</strong> {book.category}</p>
        <p><strong>Price:</strong> ${book.price}</p>
        <p><strong>Available:</strong> {book.available ? 'Yes' : 'No'}</p>
        <p><strong>Publisher:</strong> {book.publication.name || book.publication.publication_id}</p>
        <p><strong>Authors:</strong> {book.authors.map(a => a.name || a.author_id).join(', ')}</p>
        <div className="mt-4">
          <Link to={`/books/${book.book_id}/edit`} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Edit</Link>
          <Link to="/books" className="bg-gray-500 text-white px-4 py-2 rounded">Back to Books</Link>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;