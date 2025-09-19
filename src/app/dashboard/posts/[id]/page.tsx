'use client';

import { useFetch } from '@/app/hook/useFetch';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Heart, User } from 'lucide-react';
import Link from 'next/link';
import { LoadingSpinner } from '../../Components/Loading';

export default function PostDetailPage() {
  const { id } = useParams();

  const {
    data: post,
    loading: postLoading,
    error: postError,
  } = useFetch<any>(id ? `/posts/${id}` : '');

  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useFetch<any>(post ? `/users/${post.userId}` : '');

  const {
    data: comments,
    loading: commentsLoading,
    error: commentsError,
  } = useFetch<any[]>(post ? `/posts/${post.id}/comments` : '');

  // Related posts based on same user (simulate categories)
  const { data: relatedPosts, loading: relatedLoading } = useFetch<any[]>(
    post ? `/posts?userId=${post.userId}` : ''
  );

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // Load like state from localStorage
  useEffect(() => {
    const savedLikes = localStorage.getItem(`post-like-${post?.id}`);
    if (savedLikes) {
      const { liked, count } = JSON.parse(savedLikes);
      setLiked(liked);
      setLikeCount(count);
    }
  }, [post?.id]);

  const handleLike = () => {
    const newLiked = !liked;
    const newCount = newLiked ? likeCount + 1 : Math.max(likeCount - 1, 0);
    setLiked(newLiked);
    setLikeCount(newCount);
    localStorage.setItem(
      `post-like-${post?.id}`,
      JSON.stringify({ liked: newLiked, count: newCount })
    );
  };

  const loading = postLoading || userLoading || commentsLoading || relatedLoading;
  const error = postError || userError || commentsError;

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen"> <LoadingSpinner/> </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-lg">
        Failed to load post
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 md:p-12 space-y-10 max-w-5xl mx-auto"
    >
      {/* Post Details Card */}
      <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 space-y-6 relative">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          {post?.title}
        </h1>
        <div className="flex flex-col md:flex-row gap-2 text-gray-400 text-lg">
          <span className="flex items-center justify-center gap-1">
            <User /> By: {user?.name}
          </span>
          <hr />
          <span>({user?.email})</span>
        </div>
        <p className="mt-4 text-gray-200 text-lg md:text-xl leading-relaxed">{post?.body}</p>

        {/* Like Button */}
        <button
          onClick={handleLike}
          className="absolute top-6 right-6 flex items-center gap-2 text-white hover:text-red-500 transition"
        >
          {liked ? (
            <Heart className="w-6 h-6 text-red-500 fill-red-600" />
          ) : (
            <Heart className="w-6 h-6" />
          )}
          <span className="font-medium">{likeCount}</span>
        </button>
      </div>

      {/* Related Posts Section (4 small cards) */}
      {relatedPosts && relatedPosts.length > 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Related Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedPosts
              .filter((p) => p.id !== post.id)
              .slice(0, 4)
              .map((p) => (
                <Link
                  key={p.id}
                  href={`/dashboard/posts/${p.id}`}
                  className="block p-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition text-white shadow-sm"
                >
                  <h3 className="font-medium text-sm md:text-base truncate">{p.title}</h3>
                  <p className="text-gray-300 text-xs md:text-sm line-clamp-2 mt-1">{p.body}</p>
                </Link>
              ))}
          </div>
        </div>
      )}

      {/* Comments Section (Simplified) */}
      <div className="bg-gray-800 dark:bg-gray-700 rounded-xl shadow p-6 md:p-8 space-y-3">
        <h2 className="text-xl font-semibold text-white">Comments ({comments?.length ?? 0})</h2>
        <div className="space-y-2">
          {comments?.map((comment) => (
            <div key={comment.id} className="bg-gray-700 dark:bg-gray-600 rounded-lg p-3">
              <span className="font-medium text-white">{comment.name}</span>
              <p className="text-gray-300 text-sm">{comment.body}</p>
            </div>
          )) ?? null}
        </div>
      </div>
    </motion.div>
  );
}
