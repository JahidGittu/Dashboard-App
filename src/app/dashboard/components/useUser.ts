
// File: hooks/useUsers.ts
import { useEffect, useState } from 'react';
import { User } from '../components/UserModal';

export function useUsers() {
  const [data, setData] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      // replace with your actual endpoint or data fetching logic
      const res = await fetch('/api/users');
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchUsers,
  };
}
