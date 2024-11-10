// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';

const vercelURL = 'https://backend-8nriwtfsk-simran-code-48s-projects.vercel.app';
const localhostURL = 'http://localhost:8080'
const backendURL = vercelURL;
const Register = () => {
  const [f_userName, setUserName] = useState('');
  const [f_Pwd, setPwd] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendURL}/dealsdray/register`, { f_userName, f_Pwd });
      setSuccess(response.data.message);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An error occurred');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>User Name:</label>
          <input type="text" value={f_userName} onChange={(e) => setUserName(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={f_Pwd} onChange={(e) => setPwd(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
