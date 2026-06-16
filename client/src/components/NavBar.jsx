import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function NavBar() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <Link to="/" className="text-2xl font-extrabold tracking-tight">
            <span className="text-blue-600">Vid</span><span className="text-gray-900">Verve</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated && (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Dashboard</Link>
                <Link to="/myfeed" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">My Feed</Link>
                <Link to="/profile" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Profile</Link>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-500 text-sm">Hi, <strong className="text-gray-800">{user.name}</strong></span>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Login</Link>
                <Link to="/signup" className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 pt-3 space-y-1">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-lg font-medium">Dashboard</Link>
                <Link to="/myfeed" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-lg font-medium">My Feed</Link>
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-lg font-medium">Profile</Link>
                <div className="flex items-center justify-between px-3 pt-3 border-t border-gray-100 mt-2">
                  <span className="text-gray-500 text-sm">Hi, <strong>{user.name}</strong></span>
                  <button
                    onClick={() => { logout(); setMenuOpen(false); }}
                    className="bg-red-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-lg font-medium">Login</Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)} className="block px-3 py-2 bg-blue-600 text-white rounded-lg text-center font-medium">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
