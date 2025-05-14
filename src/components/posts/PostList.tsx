import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import {
  MessageCircle,
  Heart,
  Share2,
  MoreHorizontal,
  Loader2,
} from 'lucide-react';

interface Post {
  id: string;
  user_id: string;
  content: string;
  photos: string[];
  embedded_charts: string[];
  created_at: string;
  user: {
    name: string;
    username: string;
    avatar_url: string;
  };
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
  try {
    /* 1️⃣ get all posts */
    const postsRes = await fetch(
      `${VITE_URL}/rest/v1/posts?select=*&order=created_at.desc`,
      { headers: { apikey: VITE_KEY } }
    );
    if (!postsRes.ok) throw new Error('fetch posts');
    const postRows: Post[] = await postsRes.json();

    /* 2️⃣ collect distinct user_ids */
    const ids = [...new Set(postRows.map(p => p.user_id))];

    /* 3️⃣ fetch those users */
    const usersRes = await fetch(
      `${VITE_URL}/rest/v1/users?select=id,name,username,avatar_url&id=in.(${ids.join(',')})`,
      { headers: { apikey: VITE_KEY } }
    );
    if (!usersRes.ok) throw new Error('fetch users');
    const userRows = await usersRes.json();

    /* 4️⃣ stitch together */
    const withAuthors = postRows.map(p => ({
      ...p,
      user: userRows.find(u => u.id === p.user_id)!,
    }));

    setPosts(withAuthors);
  } catch (err) {
    setError('Failed to load posts');
  } finally {
    setIsLoading(false);
  }
};

  useEffect(() => {
    fetchPosts();
  }, []);

  /* ---------- render ---------- */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 size={24} className="animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          {/* Post Header */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Link to={`/user/${post.user.username}`}>
                <img
                  src={post.user.avatar_url}
                  alt={post.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </Link>
              <div className="ml-3">
                <Link
                  to={`/user/${post.user.username}`}
                  className="font-medium hover:text-blue-500 transition-colors">
                  {post.user.name}
                </Link>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                </div>
              </div>
            </div>
            <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <MoreHorizontal size={20} />
            </button>
          </div>

          {/* Post Content */}
          <div className="px-4 pb-3">
            <p className="whitespace-pre-wrap">{post.content}</p>
          </div>

          {/* Photos */}
          {post.photos.length > 0 && (
            <div className="px-4 pb-4">
              <div className="grid grid-cols-2 gap-2">
                {post.photos.map((photo, idx) => (
                  <img
                    key={idx}
                    src={photo}
                    alt=""
                    className="rounded-lg w-full h-48 object-cover"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Embedded Charts */}
          {post.embedded_charts.length > 0 && (
            <div className="px-4 pb-4">{/* embedded charts */}</div>
          )}

          {/* Post Actions */}
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center space-x-4">
            <button className="flex items-center text-gray-500 hover:text-red-500 transition-colors">
              <Heart size={20} className="mr-1.5" />
              <span className="text-sm">Like</span>
            </button>
            <button className="flex items-center text-gray-500 hover:text-blue-500 transition-colors">
              <MessageCircle size={20} className="mr-1.5" />
              <span className="text-sm">Comment</span>
            </button>
            <button className="flex items-center text-gray-500 hover:text-green-500 transition-colors">
              <Share2 size={20} className="mr-1.5" />
              <span className="text-sm">Share</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
