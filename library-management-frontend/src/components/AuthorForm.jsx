// src/components/AuthorForm.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AuthorForm() {
  const { author_id } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState({ name: '', contact_numbers: [''] });
  const [loading, setLoading] = useState(!!author_id);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name: author.name,
        contact_numbers: author.contact_numbers.filter(num => num.trim() !== ''),
      };
      if (author_id) {
        await axios.put(`http://localhost:5000/api/authors/${author_id}`, data);
      } else {
        await axios.post('http://localhost:5000/api/authors', data);
      }
      navigate('/authors')
    } catch (error) {
      alert('Error saving author');
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

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{author_id ? 'Edit Author' : 'Add Author'}</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={author.name}
            onChange={e => setAuthor({ ...author, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Contact Numbers</label>
          {author.contact_numbers.map((num, index) => (
            <input
              key={index}
              type="text"
              value={num}
              onChange={e => handleContactChange(index, e.target.value)}
              className="w-full p-2 border rounded mb-2"
              placeholder="Enter contact number"
            />
          ))}
          <button type="button" onClick={addContact} className="text-blue-500">Add Contact</button>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
}

export default AuthorForm;