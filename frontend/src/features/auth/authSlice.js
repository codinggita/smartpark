import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  userRole: null,
  isAuthenticated: false,
  isGuest: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setUserRole(state, action) {
      state.userRole = action.payload;
    },
    setGuest(state, action) {
      state.isGuest = action.payload;
      if (action.payload) {
        state.userRole = 'guest';
        state.user = { name: 'Guest User' };
      }
    },
    setAuthLoading(state, action) {
      state.loading = action.payload;
    },
    setAuthError(state, action) {
      state.error = action.payload;
    },
    clearAuth(state) {
      state.user = null;
      state.userRole = null;
      state.isAuthenticated = false;
      state.isGuest = false;
      state.error = null;
    },
  },
});

export const { setUser, setUserRole, setGuest, setAuthLoading, setAuthError, clearAuth } =
  authSlice.actions;

export default authSlice.reducer;
