import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import Dashboard from './components/Dashboard.jsx';
import BookList from './components/BookList.jsx';
import BookForm from './components/BookForm.jsx';
import BookDetail from './components/BookDetail.jsx';
import AuthorList from './components/AuthorList.jsx';
import AuthorForm from './components/AuthorForm.jsx';
import PublicationList from './components/PublicationList.jsx';
import PublicationForm from './components/PublicationForm.jsx';
import StudentList from './components/StudentList.jsx';
import StudentForm from './components/StudentForm.jsx';
import IssueList from './components/IssueList.jsx';
import IssueForm from './components/IssueForm.jsx';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

// ProtectedRoute component to restrict access to authenticated users
function ProtectedRoute({ user, children }) {
  const location = useLocation();
  
  // If user is not logged in, redirect to /login with the current location as state
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // If user is logged in, render the protected component
  return children;
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => setUser(res.data))
        .catch(() => localStorage.removeItem('token'));
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books"
          element={
            <ProtectedRoute user={user}>
              <BookList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/new"
          element={
            <ProtectedRoute user={user}>
              <BookForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/:book_id"
          element={
            <ProtectedRoute user={user}>
              <BookDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/:book_id/edit"
          element={
            <ProtectedRoute user={user}>
              <BookForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/authors"
          element={
            <ProtectedRoute user={user}>
              <AuthorList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/authors/new"
          element={
            <ProtectedRoute user={user}>
              <AuthorForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/authors/:author_id/edit"
          element={
            <ProtectedRoute user={user}>
              <AuthorForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/publications"
          element={
            <ProtectedRoute user={user}>
              <PublicationList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/publications/new"
          element={
            <ProtectedRoute user={user}>
              <PublicationForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/publications/:publication_id/edit"
          element={
            <ProtectedRoute user={user}>
              <PublicationForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students"
          element={
            <ProtectedRoute user={user}>
              <StudentList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students/new"
          element={
            <ProtectedRoute user={user}>
              <StudentForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students/:student_id/edit"
          element={
            <ProtectedRoute user={user}>
              <StudentForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/issues"
          element={
            <ProtectedRoute user={user}>
              <IssueList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/issues/new"
          element={
            <ProtectedRoute user={user}>
              <IssueForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;