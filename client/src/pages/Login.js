import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || 'Login failed'); return; }
      login(data.user, data.token);
      navigate('/dashboard');
    } catch {
      setError('Network error — please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg font-body flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-brand-card border border-brand-border rounded-2xl overflow-hidden">
          {/* Amber top accent */}
          <div className="h-0.5 bg-gradient-to-r from-transparent via-brand-accent to-transparent" />

          <div className="p-8">
            <h1 className="font-display text-3xl text-brand-text mb-1">Welcome back</h1>
            <p className="text-brand-muted text-sm font-body mb-8">Sign in to your VidVerve account</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-ui text-xs font-semibold tracking-wider uppercase text-brand-muted mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-brand-surface border border-brand-border rounded-xl text-brand-text text-sm placeholder:text-brand-faint focus:outline-none focus:border-brand-accent/60 focus:ring-1 focus:ring-brand-accent/30 transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block font-ui text-xs font-semibold tracking-wider uppercase text-brand-muted mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-brand-surface border border-brand-border rounded-xl text-brand-text text-sm placeholder:text-brand-faint focus:outline-none focus:border-brand-accent/60 focus:ring-1 focus:ring-brand-accent/30 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 px-3 py-2.5 bg-brand-accent-2/10 border border-brand-accent-2/20 rounded-lg">
                  <span className="text-brand-accent-2 text-xs">⚠</span>
                  <p className="text-brand-accent-2 text-xs font-semibold">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full font-ui font-bold text-sm tracking-wide py-3 rounded-xl bg-brand-accent text-brand-bg hover:bg-amber-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-brand-muted font-body">
              No account?{' '}
              <Link to="/signup" className="text-brand-accent font-semibold hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
