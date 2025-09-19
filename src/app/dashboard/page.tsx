'use client';

import { motion } from 'framer-motion';
import { useFetch } from '../hook/useFetch';
import CompanyDistributionChart from './components/charts/CompanyDistributionChart';
import RevenueChart from './components/charts/RevenueChart';
import UserActivityChart from './components/charts/UserActivityChart';
import StatCard from './components/StatCard';
import { LoadingSpinner } from './components/Loading';


export default function Dashboard() {
  const {
    data: posts,
    loading: postsLoading,
    error: postsError,
    refetch: refetchPosts,
  } = useFetch<any[]>('/posts');
  const {
    data: users,
    loading: usersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useFetch<any[]>('/users');
  const {
    data: comments,
    loading: commentsLoading,
    error: commentsError,
    refetch: refetchComments,
  } = useFetch<any[]>('/comments');
  const {
    data: todos,
    loading: todosLoading,
    error: todosError,
    refetch: refetchTodos,
  } = useFetch<any[]>('/todos');

  const loading = postsLoading || usersLoading || commentsLoading || todosLoading;
  const error = postsError || usersError || commentsError || todosError;

  if (loading)
    return <div className="flex items-center justify-center h-screen"> <LoadingSpinner/> </div>;
  if (error)
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;

  // Stats data
  const statsData = [
    {
      title: 'Total Users',
      value: users?.length || 0,
      change: '+5%',
      trend: 'up' as const,
      icon: 'Users' as const,
      color: 'bg-green-500',
    },
    {
      title: 'Total Posts',
      value: posts?.length || 0,
      change: '-2%',
      trend: 'down' as const,
      icon: 'FileText' as const,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Comments',
      value: comments?.length || 0,
      change: '+12%',
      trend: 'up' as const,
      icon: 'Eye' as const,
      color: 'bg-purple-500',
    },
    {
      title: 'Completed Todos',
      value: todos?.filter((t) => t.completed).length || 0,
      change: '+9%',
      trend: 'up' as const,
      icon: 'TrendingUp' as const,
      color: 'bg-yellow-500',
    },
  ];

  // Chart data
  const chartData = posts
    ? posts.slice(0, 6).map((p, i) => ({
        month: `M${i + 1}`,
        revenue: p.id * 100,
        users: Math.floor(Math.random() * 1000),
      }))
    : [];

  const pieData = users
    ? users.slice(0, 3).map((u, i) => ({
        name: u.company.name,
        value: Math.floor(Math.random() * 50) + 10,
        color: ['#646cff', '#ff63c4', '#00d8ff'][i],
      }))
    : [];

  const handleRefresh = () => {
    refetchPosts();
    refetchUsers();
    refetchComments();
    refetchTodos();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Overview powered by JSONPlaceholder API</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-shadow shadow-md"
        >
          Reload Data
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={chartData} />
        <UserActivityChart data={chartData} />
        <CompanyDistributionChart data={pieData} />
      </div>
    </motion.div>
  );
}
