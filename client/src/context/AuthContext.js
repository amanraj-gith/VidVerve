import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check for authentication state in localStorage
    const savedAuthState = localStorage.getItem('isAuthenticated');
    return savedAuthState === 'true';
  });

  const [user, setUser] = useState(() => {
    // Retrieve user data from localStorage
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : { name: '' };
  });

  const login = (userData, token) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
    if (token) localStorage.setItem('token', token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser({ name: '' });
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    // This useEffect is here to handle any changes to the state if needed in future updates
  }, [isAuthenticated, user]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
