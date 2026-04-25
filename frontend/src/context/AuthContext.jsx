import React, { createContext, useState, useEffect, useContext } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

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

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsAuthenticated(true);
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          name: currentUser.displayName || currentUser.email.split('@')[0],
          photoURL: currentUser.photoURL
        });
        
        // Retrieve role from local storage since Firebase Auth doesn't store role natively without Firestore/Custom Claims
        const storedRole = localStorage.getItem('smartpark_user_role') || 'user';
        setUserRole(storedRole);
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setUserRole(null);
        localStorage.removeItem('smartpark_user_role');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password, role) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Save role for this session
      localStorage.setItem('smartpark_user_role', role);
      setUserRole(role);
      showToast(`Successfully logged in as ${role}`, 'success');
      return userCredential.user;
    } catch (error) {
      showToast(error.message || 'Failed to login', 'error');
      throw error;
    }
  };

  const googleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      // Default Google login to 'user' role
      localStorage.setItem('smartpark_user_role', 'user');
      setUserRole('user');
      showToast(`Successfully logged in with Google as ${userCredential.user.displayName}`, 'success');
      return userCredential.user;
    } catch (error) {
      showToast(error.message || 'Google login failed', 'error');
      throw error;
    }
  };

  const signup = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Default signup to 'user' role
      localStorage.setItem('smartpark_user_role', 'user');
      setUserRole('user');
      showToast('Account created successfully', 'success');
      return userCredential.user;
    } catch (error) {
      showToast(error.message || 'Failed to create account', 'error');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      showToast('Logged out successfully', 'info');
    } catch (error) {
      showToast(error.message || 'Failed to logout', 'error');
    }
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
