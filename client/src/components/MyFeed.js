import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
    <div className="w-full h-44 bg-gray-200" />
    <div className="p-3 space-y-2">
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-2/3" />
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
    <div className="min-h-screen bg-gray-50 px-4 sm:px-8 py-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-4">My Feed</h2>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-lg font-semibold text-gray-700">Your feed is empty</p>
            <p className="text-sm text-gray-500 mt-2 mb-6 max-w-sm mx-auto">
              Go to Dashboard, browse videos, and click "+ Add to Feed" to start building your personalized feed.
            </p>
            <Link
              to="/dashboard"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm"
            >
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map(video => (
              <Link key={video.id} to={`/video/${video.id}`}>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <img
                    src={video.thumbnail}
                    alt={video.snippet.title}
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-3">
                    <h3
                      className="font-semibold text-gray-900 text-sm leading-snug mb-1 overflow-hidden"
                      style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                    >
                      {video.snippet.title}
                    </h3>
                    <p className="text-gray-500 text-xs">{video.snippet.channelTitle}</p>
                  </div>
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
