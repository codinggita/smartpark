import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, setTheme } from '../features/ui/uiSlice';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
} from '@mui/material';

const ThemeContext = createContext();

// ─── MUI Theme factories ───────────────────────────────────────────────────────
const buildMuiTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: '#4f46e5' },   // indigo-600
      secondary: { main: '#7c3aed' }, // violet-700
      background: {
        default: mode === 'light' ? '#F8FAFC' : '#0f172a',
        paper:   mode === 'light' ? '#ffffff' : '#1e293b',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    shape: { borderRadius: 12 },
  });

export const ThemeProvider = ({ children }) => {
  const dispatch = useDispatch();
  const theme    = useSelector((state) => state.ui.theme);

  const [muiTheme, setMuiTheme] = useState(() => buildMuiTheme(theme));

  // Sync MUI theme whenever Redux theme changes
  useEffect(() => {
    setMuiTheme(buildMuiTheme(theme));

    // Apply / remove Tailwind's `dark` class on <html>
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Initialise from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('smartpark_theme');
    if (saved && saved !== theme) {
      dispatch(setTheme(saved));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleTheme = () => dispatch(toggleTheme());

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: handleToggleTheme }}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
