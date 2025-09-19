'use client';

import { useFetch } from '@/app/hook/useFetch';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { PageLoader } from '../Components/Loading';
import { ErrorState } from '../components/ErrorState';
import SearchInput from '../components/SearchInput';
import UserCard from '../components/UserCard';
import UserModal, { type User } from '../components/UserModal';
import UserTable from '../components/UserTable';

export default function UsersPage() {
  const { data: users, loading, error, refetch } = useFetch<User[]>('/users');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    const q = searchTerm.trim().toLowerCase();
    if (!q) return users;

    return users.filter((user) => {
      return (
        user.name?.toLowerCase().includes(q) ||
        user.email?.toLowerCase().includes(q) ||
        user.company?.name?.toLowerCase().includes(q)
      );
    });
  }, [users, searchTerm]);

  if (loading) return <PageLoader message="Loading users..." />;
  if (error) return <ErrorState onRetry={refetch} />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-foreground-muted">Manage and view all users</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={refetch}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg transition-colors shadow-glow w-fit"
        >
          <RefreshCw className="w-4 h-4" />
          Reload Users
        </motion.button>
      </div>

      {/* Search */}
      <UserCard>
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search users by name, email, or company..."
        />
      </UserCard>

      {/* Users Table */}
      <UserCard className="overflow-hidden">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-foreground-muted">No users found matching your search.</p>
          </div>
        ) : (
          <UserTable users={filteredUsers} onRowClick={(u) => setSelectedUser(u)} />
        )}
      </UserCard>

      {/* Stats */}
      {users && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center py-4"
        >
          <p className="text-foreground-muted">
            Showing <span className="font-medium text-foreground">{filteredUsers.length}</span> of{' '}
            <span className="font-medium text-foreground">{users.length}</span> users
          </p>
        </motion.div>
      )}

      {/* User Modal */}
      <UserModal
        user={selectedUser}
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </motion.div>
  );
}
