import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import InterestTag from '../components/InterestTag';
import { Link } from 'react-router-dom';

const FEATURED_QUERY = 'latest tech trends';

const SkeletonCard = () => (
  <div className="bg-brand-card rounded-xl border border-brand-border overflow-hidden">
    <div className="w-full h-44 skeleton" />
    <div className="p-3 space-y-2">
      <div className="h-3 skeleton rounded w-full" />
      <div className="h-3 skeleton rounded w-2/3" />
      <div className="h-8 skeleton rounded mt-3" />
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
    } catch (err) {
      console.error('Error fetching featured videos:', err);
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
      alert('Failed — please try again.');
    }
  };

  const VideoCard = ({ video, index }) => (
    <div
      className="group bg-brand-card rounded-xl border border-brand-border hover:border-brand-accent/25 transition-all duration-250 hover:-translate-y-0.5 hover:shadow-amber-sm flex flex-col opacity-0 animate-fade-up"
      style={{ animationDelay: `${index * 45}ms` }}
    >
      <Link to={`/video/${video.id}`} className="block overflow-hidden rounded-t-xl">
        <img
          src={video.thumbnail}
          alt={video.snippet.title}
          className="w-full h-44 object-cover group-hover:scale-[1.02] transition-transform duration-300"
        />
      </Link>
      <div className="p-3 flex-1">
        <Link to={`/video/${video.id}`}>
          <h3 className="text-brand-text font-body font-semibold text-sm leading-snug line-clamp-2 mb-1 group-hover:text-brand-accent transition-colors duration-200">
            {video.snippet.title}
          </h3>
          <p className="text-brand-muted text-xs font-body">{video.snippet.channelTitle}</p>
        </Link>
      </div>
      <div className="px-3 pb-3">
        <button
          onClick={() => handleAddToFeeder(video.id)}
          className="w-full py-2 text-xs font-ui font-bold tracking-wide rounded-lg bg-brand-border text-brand-muted group-hover:bg-brand-accent group-hover:text-brand-bg transition-all duration-200"
        >
          + Add to Feed
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-bg font-body">
      {/* Header */}
      <div className="bg-brand-surface border-b border-brand-border px-4 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <SearchBar />
          <InterestTag />
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="font-ui font-bold text-brand-text text-lg tracking-tight">Featured Content</h2>
          <div className="flex-1 h-px bg-brand-border" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading
            ? [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
            : featuredVideos.map((video, i) => <VideoCard key={video.id} video={video} index={i} />)
          }
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
