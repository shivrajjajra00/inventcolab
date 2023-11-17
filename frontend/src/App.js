import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter as Router, Form } from "react-router-dom";
import Login from "./auth/login.js";
import HomePage from "./homepage/HomePage.js";
import UpdateClient from "./sideBar/handleinvoice/UpdateClientModel.js";
import ForgotPassword from "./auth/ForgotPassword.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<HomePage />} />
        <Route exact path="/user/users/:_id" element={<UpdateClient />} />
      </Routes>
    </Router>
  );
}

export default App;
