import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Switch from "react-switch";

var baseUrl = "http://localhost:4040";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();


  const handleLogin = async () => {
    if (isLoggingIn) {
      return;
    }
setIsLoggingIn(true);

    try {
      const response = await fetch(`${baseUrl}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem("token", data.auth); // Store the JWT token
        localStorage.setItem("isLoggedIn", "true");
        setMessage(data.message);
        navigate("/home");
      } else {
        setIsLoggingIn(false);
        setMessage(data.message);
      }
    } catch (error) {
      setIsLoggingIn(false);
      console.error(error);
      setMessage("An error occurred. Please try again later.");
    }
  };
  const [checked, setChecked] = useState(false);

  const handleChange = (isChecked) => {
    setChecked(isChecked);
  };

  return (
    <div className="signIn-box">
      <div className="login-logo">
        <h2>Inventcolab</h2>
      </div>
      <div className="login-form">
        <h1>Login</h1>
        <h5>Enter your email and password to sign in</h5>
        <div>
          <label>
            <span>* </span> Email:
          </label>
          <input
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label>
            <span>* </span> Password:
          </label>
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="forgot_password">
          <div className="switch">
            <Switch
              height={20}
              onHandleColor={"red"}
              width={40}
              uncheckedIcon={null}
              checkedIcon={null}
              onChange={handleChange}
              checked={checked}
            />
            <label style={{ marginLeft: "10px" }}>Remember me</label>
          </div>
          <a style={{ color: "#064d6a" }}>Forgot Password?</a>
        </div>
        <br />
        <div>
          <button onClick={() => handleLogin()}> <a>Login</a></button> <br /> <br />
        </div>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Login;
