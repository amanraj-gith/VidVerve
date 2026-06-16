import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import InterestTag from '../components/InterestTag';
import { Link } from 'react-router-dom';

const FEATURED_QUERY = 'latest tech trends';

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

function Dashboard() {
  const [featuredVideos, setFeaturedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedVideos();
  }, []);

  const fetchFeaturedVideos = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE}/api/video/featured`, {
        query: FEATURED_QUERY,
      });
      const processed = response.data.map(video => ({
        ...video,
        id: video.id.videoId,
        thumbnail: video.snippet.thumbnails?.medium?.url,
      }));
      setFeaturedVideos(processed);
    } catch (error) {
      console.error('Error fetching featured videos:', error);
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
        { videoId, tags: [FEATURED_QUERY] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Added to your feed!');
    } catch {
      alert('Failed to add — please try again.');
    }
  };

  const VideoCard = ({ video }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      <Link to={`/video/${video.id}`}>
        <img
          src={video.thumbnail}
          alt={video.snippet.title}
          className="w-full h-44 object-cover"
        />
        <div className="p-3">
          <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {video.snippet.title}
          </h3>
          <p className="text-gray-500 text-xs">{video.snippet.channelTitle}</p>
        </div>
      </Link>
      <div className="px-3 pb-3 mt-auto">
        <button
          onClick={() => handleAddToFeeder(video.id)}
          className="w-full bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          + Add to Feed
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#3ABEF9] px-4 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <SearchBar />
          <InterestTag />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Featured Content</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading
            ? [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
            : featuredVideos.map(video => <VideoCard key={video.id} video={video} />)
          }
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
