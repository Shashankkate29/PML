import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:5000/api/v1' : '/api/v1';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// In-memory cache for API requests
const fetchCache = new Map<string, CacheEntry<any>>();
const CACHE_DURATION_MS = 30000; // 30 seconds cache duration

export function useFetch<T>(endpoint: string, fallbackData: T) {
  const [data, setData] = useState<T>(() => {
    if (endpoint && fetchCache.has(endpoint)) {
      return fetchCache.get(endpoint)!.data;
    }
    return fallbackData;
  });

  const [loading, setLoading] = useState<boolean>(() => {
    if (!endpoint) return false;
    return !fetchCache.has(endpoint);
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!endpoint) {
      setLoading(false);
      return;
    }

    let active = true;
    const now = Date.now();
    const cached = fetchCache.get(endpoint);

    // If cached data exists and is fresh (within CACHE_DURATION_MS), use it and skip fetch
    if (cached && (now - cached.timestamp < CACHE_DURATION_MS)) {
      setData(cached.data);
      setLoading(false);
      return;
    }

    // Stale-While-Revalidate (SWR): immediately use stale cache data if available
    if (cached) {
      setData(cached.data);
      setLoading(false);
    } else {
      setLoading(true);
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        if (active && json.success) {
          fetchCache.set(endpoint, { data: json.data, timestamp: Date.now() });
          setData(json.data);
          setError(null);
        } else if (active) {
          throw new Error(json.error || 'Request failed');
        }
      } catch (err: any) {
        console.warn(`[useFetch] Failed to fetch from ${endpoint}, reverting to fallback data:`, err.message);
        if (active) {
          setError(err.message);
          if (!cached) {
            setData(fallbackData);
          }
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
