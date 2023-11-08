import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css'; // Import the CSS file

export default function Register() {
  const navigate = useNavigate();
  const [Email, setEmail] = useState('');
  const [Id, setId] = useState('abc');
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('https://localhost:7126/api/register', {
        Name: Username,
        Email: Email,
        Password: Password,
        Id: Id,
      })
      .then(async (res) => {
        console.log(res.data);
        await window.localStorage.setItem('UserData', JSON.stringify(res.data));
        navigate(`/landingPage`);
      })
      .catch((err) => {
        console.log('error in posting', err);
        window.alert('User Already Exists');
        navigate(`/login`);
      });
  };

  return (
   
        <div className="container">
          <h1>Registration Page</h1>
          <div className="form-box">
            <form onSubmit={handleSubmit}>
              <div className="form-group email-group"> {/* Add the email-group class */}
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
            Have an account? <Link className="login-link" to="/login">LOGIN</Link>
          </div>
        </div>
      );
}
