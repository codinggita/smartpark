import { useState, useEffect } from 'react';

/**
 * useDebounce hook allows you to debounce any fast changing value.
 * Useful for search inputs to prevent API calls on every keystroke.
 * 
 * @param {any} value - The value that is changing frequently
 * @param {number} delay - The delay in milliseconds
 * @returns {any} - The debounced value
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set debouncedValue to value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Return a cleanup function that will be called every time useEffect re-runs
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
