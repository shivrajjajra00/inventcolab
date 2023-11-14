import React from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import Login from "./auth/login.js";
import Dashboard from "./homepage/HomePage.js";
import { isAuthenticated } from "./auth/auth";

const PrivateRoute = ({ path, element }) => {
  return isAuthenticated() ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" />
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <PrivateRoute path="/home" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
