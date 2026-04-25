import React, { createContext, useState, useEffect, useContext } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'user', 'admin', or 'guest'
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

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setIsAuthenticated(true);
        setIsGuest(false);
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          name: currentUser.displayName || currentUser.email.split('@')[0],
          photoURL: currentUser.photoURL
        });
        
        const storedRole = localStorage.getItem('smartpark_user_role') || 'user';
        setUserRole(storedRole);
      } else {
        const checkGuest = localStorage.getItem('smartpark_guest_mode') === 'true';
        if (checkGuest) {
          setIsGuest(true);
          setUserRole('guest');
          setUser({ name: 'Guest User' });
        } else {
          setIsAuthenticated(false);
          setIsGuest(false);
          setUser(null);
          setUserRole(null);
        }
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password, role) => {
    try {
      const fbUser = await authService.login(email, password);
      localStorage.setItem('smartpark_user_role', role);
      localStorage.removeItem('smartpark_guest_mode');
      setUserRole(role);
      showToast(`Successfully logged in as ${role}`, 'success');
      return fbUser;
    } catch (error) {
      showToast(error.message || 'Failed to login', 'error');
      throw error;
    }
  };

  const googleLogin = async () => {
    try {
      const fbUser = await authService.googleLogin();
      localStorage.setItem('smartpark_user_role', 'user');
      localStorage.removeItem('smartpark_guest_mode');
      setUserRole('user');
      showToast(`Successfully logged in with Google as ${fbUser.displayName || 'User'}`, 'success');
      return fbUser;
    } catch (error) {
      showToast(error.message || 'Google login failed', 'error');
      throw error;
    }
  };

  const signup = async (email, password, name) => {
    try {
      const fbUser = await authService.signup(email, password, name);
      localStorage.setItem('smartpark_user_role', 'user');
      localStorage.removeItem('smartpark_guest_mode');
      setUserRole('user');
      showToast('Account created successfully', 'success');
      return fbUser;
    } catch (error) {
      showToast(error.message || 'Failed to create account', 'error');
      throw error;
    }
  };

  const loginAsGuest = () => {
    localStorage.setItem('smartpark_guest_mode', 'true');
    setIsGuest(true);
    setUserRole('guest');
    setUser({ name: 'Guest User' });
    showToast('Continuing as guest', 'info');
  };

  const logout = async () => {
    try {
      if (!isGuest) {
        await authService.logout();
      }
      localStorage.removeItem('smartpark_user_role');
      localStorage.removeItem('smartpark_guest_mode');
      setIsGuest(false);
      setUserRole(null);
      setUser(null);
      setIsAuthenticated(false);
      showToast('Logged out successfully', 'info');
    } catch (error) {
      showToast(error.message || 'Failed to logout', 'error');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isGuest, 
      userRole, 
      user, 
      login, 
      googleLogin, 
      signup, 
      loginAsGuest,
      logout 
    }}>
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
