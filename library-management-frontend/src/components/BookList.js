import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books from backend
    axios.get('http://localhost:5000/api/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  return (
    <div>
      <h2>Books</h2>
      <ul>
        {books.map(book => (
          <li key={book.book_id}>
            {book.title} ({book.category}, ${book.price}, {book.available ? 'Available' : 'Issued'})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;