import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css'; // Import the CSS file

export default function Login() {
  const navigate = useNavigate();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('https://localhost:7126/api/login', {
        Email: Email,
        Password: Password,
      })
      .then(async (res) => {
        console.log(res.data);
        await window.localStorage.setItem('UserData', JSON.stringify(res.data));
        navigate(`/landingPage`);
      })
      .catch((err) => {
        console.log('error in logging', err);
        window.alert('Invalid Credentials');
      });
  };

  return (
    <div className="container">
      <h1>Login Page</h1>
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Enter Email:</label>
            <input
              type="text"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
            />
          </div>
          <div className="form-group">
            <label>Enter Password:</label>
            <input
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your Password"
            />
          </div>

          <input
            className="submit-button"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
      <div>
        Don't have an account? <Link className="register-link" to="/">Register</Link>
      </div>
    </div>
  );
}
