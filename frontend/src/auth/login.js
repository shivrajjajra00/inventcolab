import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

var baseUrl = "http://localhost:4040";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false); // Add a state to track login status


    const navigate = useNavigate();
    // const token = localStorage.getItem('token');

    // Use these headers in your subsequent API requests.



    const handleLogin = async () => {
        if (isLoggingIn) {
            // If a login request is already in progress, ignore the click
            return;
        }

        setIsLoggingIn(true);

        try {
            const response = await fetch(`${baseUrl}/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.status === 200) {
                localStorage.setItem('token', data.auth); // Store the JWT token
                localStorage.setItem('isLoggedIn', 'true');
                setMessage(data.message);
                navigate('/CreateUserForm');
            } else {
                setIsLoggingIn(false);
                setMessage(data.message);
            }
        } catch (error) {
            setIsLoggingIn(false);
            console.error(error);
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="addContainer">
            <h2>Login</h2>
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
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <br />
            <div>
                <button className='btn' onClick={() => handleLogin()}>Login</button> <br /> <br />
            </div>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;


