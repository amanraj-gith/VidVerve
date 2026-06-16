import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function NavBar() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const navLink = (to, label) => (
    <Link
      to={to}
      className={`font-ui font-semibold text-sm tracking-wide transition-colors duration-150 ${
        location.pathname === to
          ? 'text-brand-accent'
          : 'text-brand-muted hover:text-brand-text'
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 font-ui ${
        scrolled
          ? 'bg-brand-surface/95 backdrop-blur-md border-b border-brand-border'
          : 'bg-brand-bg border-b border-brand-border/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-0.5 shrink-0">
            <span className="text-brand-accent text-2xl font-ui font-extrabold tracking-tight leading-none">Vid</span>
            <span className="text-brand-text text-2xl font-ui font-extrabold tracking-tight leading-none">Verve</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-7">
            {isAuthenticated && (
              <>
                {navLink('/dashboard', 'Dashboard')}
                {navLink('/myfeed', 'My Feed')}
                {navLink('/profile', 'Profile')}
              </>
            )}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-brand-muted text-sm">
                  Hi, <span className="text-brand-text font-semibold">{user.name}</span>
                </span>
                <button
                  onClick={logout}
                  className="text-sm font-semibold px-4 py-1.5 rounded-lg border border-brand-accent-2/40 text-brand-accent-2 hover:bg-brand-accent-2 hover:text-brand-bg transition-all duration-150"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-semibold text-brand-muted hover:text-brand-text transition-colors">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-semibold px-4 py-1.5 rounded-lg bg-brand-accent text-brand-bg hover:bg-amber-400 transition-all duration-150"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-brand-muted hover:text-brand-text hover:bg-brand-card transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-brand-border py-3 space-y-1 font-ui">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block px-3 py-2.5 rounded-lg text-brand-text hover:bg-brand-card text-sm font-semibold">Dashboard</Link>
                <Link to="/myfeed" className="block px-3 py-2.5 rounded-lg text-brand-text hover:bg-brand-card text-sm font-semibold">My Feed</Link>
                <Link to="/profile" className="block px-3 py-2.5 rounded-lg text-brand-text hover:bg-brand-card text-sm font-semibold">Profile</Link>
                <div className="flex items-center justify-between px-3 pt-3 mt-1 border-t border-brand-border">
                  <span className="text-brand-muted text-sm">Hi, <span className="text-brand-text font-semibold">{user.name}</span></span>
                  <button
                    onClick={() => { logout(); setMenuOpen(false); }}
                    className="text-sm font-semibold px-4 py-1.5 rounded-lg border border-brand-accent-2/40 text-brand-accent-2"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2.5 rounded-lg text-brand-text hover:bg-brand-card text-sm font-semibold">Login</Link>
                <Link to="/signup" className="block px-3 py-2.5 rounded-lg bg-brand-accent text-brand-bg text-sm font-semibold text-center">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
