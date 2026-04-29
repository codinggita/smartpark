import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  theme: localStorage.getItem('smartpark_theme') || 'light',
  sidebarOpen: true,
  globalError: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setTheme(state, action) {
      state.theme = action.payload;
      localStorage.setItem('smartpark_theme', action.payload);
    },
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('smartpark_theme', state.theme);
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen(state, action) {
      state.sidebarOpen = action.payload;
    },
    setGlobalError(state, action) {
      state.globalError = action.payload;
    },
    clearGlobalError(state) {
      state.globalError = null;
    },
  },
});

export const {
  setLoading,
  setTheme,
  toggleTheme,
  toggleSidebar,
  setSidebarOpen,
  setGlobalError,
  clearGlobalError,
} = uiSlice.actions;

export default uiSlice.reducer;
