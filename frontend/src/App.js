import './App.css';
import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './auth/login.js';
import Dashboard from './homepage/HomePage.js';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
