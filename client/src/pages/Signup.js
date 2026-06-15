// src/pages/Signup.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Signup failed');
        return;
      }
      login(data.user, data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="signup-form flex justify-center">
      <h1 className="text-2xl font-bold ml-12 ">Signup</h1>
      <form onSubmit={handleSignup}>
        <div className="mt-14">
          <label htmlFor="name" className="text-sm font-bold ml-12 mt-20">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mt-14">
          <label htmlFor="email" className="text-sm font-bold ml-12 mt-20">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mt-14">
          <label htmlFor="password" className="text-sm font-bold ml-12 mt-20">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
          Signup
        </button>
        {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}
      </form>
    </div>
  );
}

export default Signup;
