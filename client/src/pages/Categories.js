import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
    <div className="w-full h-44 bg-gray-200" />
    <div className="p-3 space-y-2">
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-2/3" />
    </div>
  </div>
);

function Categories() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { tag } = useParams();

  useEffect(() => {
    fetchVideosByTag(tag);
  }, [tag]);

  const fetchVideosByTag = async (t) => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE}/api/video/tags/${t}`);
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
        <h2 className="text-xl font-bold text-gray-900 mb-4 capitalize">{tag}</h2>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-5xl mb-4">📂</p>
            <p className="text-lg font-semibold text-gray-600">No videos found for "{tag}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map(video => (
              <Link key={video.id.videoId} to={`/video/${video.id.videoId}`}>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <img
                    src={video.snippet.thumbnails?.medium?.url}
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
}

export default Categories;
