'use client';

import { useState, useEffect, useCallback } from 'react';

export const useInfiniteFetch = <T>(url: string, limit: number = 6) => {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${url}?_page=${page}&_limit=${limit}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const newData = await res.json();
      setData(prev => [...prev, ...newData]);
      if (newData.length < limit) setHasMore(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, page, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const loadMore = () => {
    if (!loading && hasMore) setPage(prev => prev + 1);
  };

  return { data, loading, hasMore, loadMore, error };
};
