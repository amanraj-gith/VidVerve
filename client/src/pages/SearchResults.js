import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';

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

const SearchResults = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    if (query) fetchSearchResults(query);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      alert('Failed — please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg font-body px-4 sm:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="font-ui font-bold text-brand-text text-lg tracking-tight">
            {query ? (
              <>Results for <span className="text-brand-accent">"{query}"</span></>
            ) : 'Search Results'}
          </h2>
          <div className="flex-1 h-px bg-brand-border" />
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-28">
            <p className="text-4xl mb-4">🔍</p>
            <p className="font-ui font-bold text-brand-text text-lg mb-1">No results found</p>
            <p className="text-brand-muted text-sm">Try a different search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map((video, i) => (
              <div
                key={video.id.videoId}
                className="group bg-brand-card rounded-xl border border-brand-border hover:border-brand-accent/25 transition-all duration-250 hover:-translate-y-0.5 hover:shadow-amber-sm flex flex-col opacity-0 animate-fade-up"
                style={{ animationDelay: `${i * 45}ms` }}
              >
                <Link to={`/video/${video.id.videoId}`} className="block overflow-hidden rounded-t-xl">
                  <img
                    src={video.snippet.thumbnails?.medium?.url}
                    alt={video.snippet.title}
                    className="w-full h-44 object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </Link>
                <div className="p-3 flex-1">
                  <Link to={`/video/${video.id.videoId}`}>
                    <h3 className="text-brand-text font-body font-semibold text-sm leading-snug line-clamp-2 mb-1 group-hover:text-brand-accent transition-colors duration-200">
                      {video.snippet.title}
                    </h3>
                    <p className="text-brand-muted text-xs">{video.snippet.channelTitle}</p>
                  </Link>
                </div>
                <div className="px-3 pb-3">
                  <button
                    onClick={() => handleAddToFeeder(video.id.videoId)}
                    className="w-full py-2 text-xs font-ui font-bold tracking-wide rounded-lg bg-brand-border text-brand-muted group-hover:bg-brand-accent group-hover:text-brand-bg transition-all duration-200"
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
