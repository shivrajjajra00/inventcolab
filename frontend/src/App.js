import './App.css';
import React from 'react';
import { Routes, Route, outlet, BrowserRouter as Router } from 'react-router-dom';
import Login from './auth/login.js';
import CreateUserForm from './dashboard/dashboard.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/CreateUserForm' element={<CreateUserForm />} />
      </Routes>
    </Router>
  );
}

export default App;
