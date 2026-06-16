import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SkeletonCard = () => (
  <div className="bg-brand-card rounded-xl border border-brand-border overflow-hidden">
    <div className="w-full h-44 skeleton" />
    <div className="p-3 space-y-2">
      <div className="h-3 skeleton rounded w-full" />
      <div className="h-3 skeleton rounded w-2/3" />
    </div>
  </div>
);

const MyFeed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPersonalizedVideos();
  }, []);

  const fetchPersonalizedVideos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_BASE}/api/video/personalized`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVideos(response.data);
    } catch {
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg font-body px-4 sm:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="font-ui font-bold text-brand-text text-lg tracking-tight">My Feed</h2>
          <div className="flex-1 h-px bg-brand-border" />
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-28">
            <div className="text-5xl mb-5">📭</div>
            <p className="font-ui font-bold text-brand-text text-xl mb-2">Your feed is empty</p>
            <p className="text-brand-muted text-sm max-w-xs mx-auto mb-8 leading-relaxed">
              Go to Dashboard, find videos you love, and hit "+ Add to Feed" to start building your personalized feed.
            </p>
            <Link
              to="/dashboard"
              className="inline-block font-ui font-bold text-sm tracking-wide px-6 py-2.5 rounded-xl bg-brand-accent text-brand-bg hover:bg-amber-400 transition-all duration-200"
            >
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map((video, i) => (
              <Link
                key={video.id}
                to={`/video/${video.id}`}
                className="group block bg-brand-card rounded-xl border border-brand-border hover:border-brand-accent/25 transition-all duration-250 hover:-translate-y-0.5 hover:shadow-amber-sm overflow-hidden opacity-0 animate-fade-up"
                style={{ animationDelay: `${i * 45}ms` }}
              >
                <div className="overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.snippet.title}
                    className="w-full h-44 object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-brand-text font-body font-semibold text-sm leading-snug line-clamp-2 mb-1 group-hover:text-brand-accent transition-colors duration-200">
                    {video.snippet.title}
                  </h3>
                  <p className="text-brand-muted text-xs">{video.snippet.channelTitle}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFeed;
