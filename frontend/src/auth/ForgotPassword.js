import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  var baseUrl = "http://localhost:4040";

  const handleForgotPassword = async () => {
    try {
      const response = await fetch(`${baseUrl}/admin/forgotpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  const handleBack = () => {
    // Perform any logout-related actions here
    navigate("/home"); // Navigate to the login page or the desired logout destination
  };

  return (
    <div class="addContainer">
      <h2>Forgot Password</h2>
      <div>
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <br />
      <div>
        <button onClick={handleForgotPassword}>Reset Password</button> <br />{" "}
        <br />
        <button onClick={handleBack}>Back</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPassword;
