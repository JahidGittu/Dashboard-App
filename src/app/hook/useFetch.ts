'use client';

import { useCallback, useEffect, useState } from 'react';

// Default API base URL
const BASE_URL = 'https://jsonplaceholder.typicode.com';

export function useFetch<T>(endpoint: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!endpoint) return;
    try {
      setLoading(true);
      setError(null);

      // prepend BASE_URL automatically
      const res = await fetch(`${BASE_URL}${endpoint}`);
      if (!res.ok) throw new Error('Failed to fetch data');

      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
