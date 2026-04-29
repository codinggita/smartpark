import { useState, useEffect, useCallback } from 'react';

/**
 * useFetch hook for handling API calls with loading and error states.
 * 
 * @param {Function} apiFunction - The service function to call
 * @param {Array} dependencies - Dependencies that trigger the effect
 * @param {boolean} immediate - Whether to run the fetch immediately
 * @returns {Object} - { data, loading, error, refetch }
 */
export const useFetch = (apiFunction, dependencies = [], immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFunction(...args);
      if (response.success) {
        setData(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch data');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
      console.error('useFetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, dependencies);

  return { data, loading, error, refetch: fetchData };
};
