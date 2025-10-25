import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem('authToken');
    if (token) {
      // Verify token and set user
      // This would typically be an API call
      setUser({ id: 1, name: 'John Doe', email: 'john@example.com', role: 'user' });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Login logic here
    const user = { id: 1, name: 'John Doe', email, role: 'user' };
    setUser(user);
    localStorage.setItem('authToken', 'dummy-token');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};