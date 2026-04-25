import React, { createContext, useState, useEffect, useContext } from 'react';
import { Snackbar, Alert } from '@mui/material';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'user' or 'admin'
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Toast state
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const showToast = (message, severity = 'success') => {
    setToast({ open: true, message, severity });
  };

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') return;
    setToast({ ...toast, open: false });
  };

  // Check local storage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('smartpark_auth');
    if (storedAuth) {
      const { isAuthenticated: isAuth, userRole: role, user: userData } = JSON.parse(storedAuth);
      setIsAuthenticated(isAuth);
      setUserRole(role);
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const login = (email, password, role) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const authData = { isAuthenticated: true, userRole: role, user: { email, name: email.split('@')[0] } };
          setIsAuthenticated(true);
          setUserRole(role);
          setUser(authData.user);
          localStorage.setItem('smartpark_auth', JSON.stringify(authData));
          showToast(`Successfully logged in as ${role}`, 'success');
          resolve(authData);
        } else {
          showToast('Invalid credentials', 'error');
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const googleLogin = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const authData = { isAuthenticated: true, userRole: 'user', user: { email: 'user@google.com', name: 'Google User' } };
        setIsAuthenticated(true);
        setUserRole('user');
        setUser(authData.user);
        localStorage.setItem('smartpark_auth', JSON.stringify(authData));
        showToast('Successfully logged in with Google', 'success');
        resolve(authData);
      }, 800);
    });
  };

  const signup = (email, password, name) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password && name) {
          const authData = { isAuthenticated: true, userRole: 'user', user: { email, name } };
          setIsAuthenticated(true);
          setUserRole('user');
          setUser(authData.user);
          localStorage.setItem('smartpark_auth', JSON.stringify(authData));
          showToast('Account created successfully', 'success');
          resolve(authData);
        } else {
          showToast('Please fill all fields', 'error');
          reject(new Error('Missing fields'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUser(null);
    localStorage.removeItem('smartpark_auth');
    showToast('Logged out successfully', 'info');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, user, login, googleLogin, signup, logout }}>
      {children}
      <Snackbar open={toast.open} autoHideDuration={6000} onClose={handleCloseToast} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleCloseToast} severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
