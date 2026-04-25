import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

export const authService = {
  login: async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  signup: async (email, password, name) => {
    // In Firebase, we can also update the profile with the name after signup if needed.
    // For now, we'll just create the user.
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  googleLogin: async () => {
    const userCredential = await signInWithPopup(auth, googleProvider);
    return userCredential.user;
  },

  logout: async () => {
    await signOut(auth);
  },

  onAuthStateChanged: (callback) => {
    return onAuthStateChanged(auth, callback);
  }
};
