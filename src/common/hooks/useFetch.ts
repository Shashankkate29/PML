import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:5000/api/v1';

export function useFetch<T>(endpoint: string, fallbackData: T) {
  const [data, setData] = useState<T>(fallbackData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        if (active && json.success) {
          setData(json.data);
        } else if (active) {
          throw new Error(json.error || 'Request failed');
        }
      } catch (err: any) {
        console.warn(`[useFetch] Failed to fetch from ${endpoint}, reverting to fallback data:`, err.message);
        if (active) {
          setError(err.message);
          setData(fallbackData);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  return { data, loading, error };
}

export default useFetch;
