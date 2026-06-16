import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const SkeletonCard = () => (
  <div className="bg-brand-card rounded-xl border border-brand-border overflow-hidden">
    <div className="w-full h-44 skeleton" />
    <div className="p-3 space-y-2">
      <div className="h-3 skeleton rounded w-full" />
      <div className="h-3 skeleton rounded w-2/3" />
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
    <div className="min-h-screen bg-brand-bg font-body px-4 sm:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="font-ui font-bold text-brand-text text-lg tracking-tight capitalize">{tag}</h2>
          <div className="flex-1 h-px bg-brand-border" />
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-28">
            <div className="text-4xl mb-4">📂</div>
            <p className="font-ui font-bold text-brand-text text-lg mb-1">No videos found</p>
            <p className="text-brand-muted text-sm">Try a different category</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map((video, i) => (
              <Link
                key={video.id.videoId}
                to={`/video/${video.id.videoId}`}
                className="group block bg-brand-card rounded-xl border border-brand-border hover:border-brand-accent/25 transition-all duration-250 hover:-translate-y-0.5 hover:shadow-amber-sm overflow-hidden opacity-0 animate-fade-up"
                style={{ animationDelay: `${i * 45}ms` }}
              >
                <div className="overflow-hidden">
                  <img
                    src={video.snippet.thumbnails?.medium?.url}
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
}

export default Categories;
