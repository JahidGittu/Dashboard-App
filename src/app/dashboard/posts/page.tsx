'use client';

import { useFetch } from '@/app/hook/useFetch';
import { motion } from 'framer-motion';
import PostCard from '../components/PostCard';
import { LoadingSpinner } from '../Components/Loading';
import Pagination from '../components/Pagination';
import { useState } from 'react';

export default function PostsPage() {
  const [page, setPage] = useState(1);
  const limit = 9; // প্রতি পেজে কয়টা পোস্ট দেখাবো
  const totalPosts = 100; // jsonplaceholder এর মোট পোস্ট
  const totalPages = Math.ceil(totalPosts / limit);

  const {
    data: posts,
    loading,
    error,
  } = useFetch<any[]>(`/posts?_page=${page}&_limit=${limit}`);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-lg">
        Failed to load posts
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className=" max-w-7xl mx-auto space-y-10"
    >
      {/* Header */}
      <div className="flex items-center justify-center w-full pb-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Posts</h1>
          <p className="text-foreground-muted">
            Explore all blog posts and articles
          </p>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </motion.div>
  );
}
