'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface PostCardProps {
  post: {
    id: number;
    title: string;
    body: string;
  };
}

export default function PostCard({ post }: PostCardProps) {
  const [likeCount, setLikeCount] = useState(0);

  // লোকালস্টোরেজ থেকে লাইক ডাটা লোড করবো
  useEffect(() => {
    const savedLikes = localStorage.getItem(`post-like-${post.id}`);
    if (savedLikes) {
      const { count } = JSON.parse(savedLikes);
      setLikeCount(count);
    }
  }, [post.id]);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="relative flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden min-h-[280px]"
    >
      {/* Like Counter (top-right corner) */}
      <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/80 dark:bg-gray-700/80 px-2 py-1 rounded-full shadow text-xs">
        <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
        <span className="font-medium text-gray-700 dark:text-gray-200">{likeCount}</span>
      </div>

      {/* Header */}
      <div className="p-5 dark:border-gray-700 max-h-20 h-full flex items-start">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
          {post.title}
        </h2>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 min-h-[100px]">
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-4">
          {post.body}
        </p>
      </div>

      {/* Footer */}
      <div className="p-5 border-t border-gray-100 dark:border-gray-700 mt-auto">
        <Link
          href={`/dashboard/posts/${post.id}`}
          className="inline-block text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          Read More →
        </Link>
      </div>
    </motion.div>
  );
}
