import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }
      login(data.user, data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="login-form flex justify-center items-center">
      <div>
        <h1 className="text-2xl font-bold ml-12 mt-14">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mt-14">
            <label htmlFor="email" className="text-2xl font-bold ml-12 mt-14">Email</label>
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
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button type="submit" className="mt-14 ml-12 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Login
          </button>
          {error && <p className="mt-4 ml-12 text-red-600 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
