import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';

const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
    <div className="w-full h-44 bg-gray-200" />
    <div className="p-3 space-y-2">
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-2/3" />
      <div className="h-8 bg-gray-100 rounded mt-3" />
    </div>
  </div>
);

const SearchResults = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    if (query) fetchSearchResults(query);
  }, [location.search]);

  const fetchSearchResults = async (q) => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE}/api/video/search`, { params: { q } });
      setVideos(Array.isArray(response.data) ? response.data : []);
    } catch {
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToFeeder = async (videoId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) { alert('Please log in first'); return; }
      await axios.post(
        `${process.env.REACT_APP_API_BASE}/api/video/add-to-feeder`,
        { videoId, tags: [query] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Added to your feed!');
    } catch {
      alert('Failed to add — please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-8 py-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {query ? `Results for "${query}"` : 'Search Results'}
        </h2>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-lg font-semibold text-gray-600">No results found</p>
            <p className="text-sm mt-1">Try a different search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map(video => (
              <div key={video.id.videoId} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                <Link to={`/video/${video.id.videoId}`}>
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
                </Link>
                <div className="px-3 pb-3 mt-auto">
                  <button
                    onClick={() => handleAddToFeeder(video.id.videoId)}
                    className="w-full bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    + Add to Feed
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
