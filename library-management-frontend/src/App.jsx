import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StudentList from './components/StudentList';
import BookList from './components/BookList';
import IssueForm from './components/IssueForm';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Library Management System</h1>
        <Switch>
          <Route path="/students" component={StudentList} />
          <Route path="/books" component={BookList} />
          <Route path="/issue" component={IssueForm} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;