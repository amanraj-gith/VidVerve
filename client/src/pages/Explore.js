import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  { label: 'Technology', emoji: '💻', query: 'technology trends 2024' },
  { label: 'Fitness', emoji: '🏋️', query: 'fitness workout training' },
  { label: 'Travel', emoji: '✈️', query: 'travel destinations explore' },
  { label: 'Entertainment', emoji: '🎬', query: 'entertainment movies music' },
];

function VideoCard({ video }) {
  const vid = video.id?.videoId || video.id;
  const thumb = video.snippet?.thumbnails?.medium?.url;
  const title = video.snippet?.title;
  const channel = video.snippet?.channelTitle;

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) { alert('Please log in first'); return; }
      await axios.post(
        `${process.env.REACT_APP_API_BASE}/api/video/add-to-feeder`,
        { videoId: vid, tags: [title?.split(' ').slice(0, 3).join(' ')] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Added to your feed!');
    } catch {
      alert('Failed — please try again.');
    }
  };

  return (
    <div className="group relative shrink-0 w-56 sm:w-64 bg-brand-card border border-brand-border rounded-xl overflow-hidden hover:border-brand-accent/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-amber-sm flex flex-col">
      <Link to={`/video/${vid}`} className="block overflow-hidden">
        <img
          src={thumb}
          alt={title}
          className="w-full h-36 object-cover group-hover:scale-[1.03] transition-transform duration-300"
          loading="lazy"
        />
      </Link>
      <div className="p-3 flex-1 flex flex-col">
        <Link to={`/video/${vid}`}>
          <h3 className="text-brand-text font-body font-semibold text-xs leading-snug line-clamp-2 mb-1 group-hover:text-brand-accent transition-colors duration-200">
            {title}
          </h3>
          <p className="text-brand-muted text-[10px]">{channel}</p>
        </Link>
        <button
          onClick={handleAdd}
          className="mt-auto pt-3 w-full py-1.5 text-[10px] font-ui font-bold tracking-wide rounded-lg bg-brand-border text-brand-muted group-hover:bg-brand-accent group-hover:text-brand-bg transition-all duration-200"
        >
          + Add to Feed
        </button>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="shrink-0 w-56 sm:w-64 bg-brand-card border border-brand-border rounded-xl overflow-hidden">
      <div className="w-full h-36 skeleton" />
      <div className="p-3 space-y-2">
        <div className="h-2.5 skeleton rounded w-full" />
        <div className="h-2.5 skeleton rounded w-2/3" />
        <div className="h-6 skeleton rounded mt-3" />
      </div>
    </div>
  );
}

function CategoryRow({ category }) {
  const { label, emoji, query } = category;
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const rowRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE}/api/video/search`, { params: { q: query } })
      .then(res => setVideos(Array.isArray(res.data) ? res.data : []))
      .catch(() => setVideos([]))
      .finally(() => setLoading(false));
  }, [query]);

  const scroll = (dir) => {
    if (!rowRef.current) return;
    rowRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xl">{emoji}</span>
        <h2 className="font-ui font-bold text-brand-text text-base tracking-tight">{label}</h2>
        <div className="flex-1 h-px bg-brand-border" />
        <Link
          to={`/categories?tag=${encodeURIComponent(label)}`}
          className="text-xs font-ui font-semibold text-brand-muted hover:text-brand-accent transition-colors"
        >
          See all →
        </Link>
        <div className="flex gap-1">
          <button
            onClick={() => scroll(-1)}
            className="w-7 h-7 rounded-lg bg-brand-card border border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-accent/30 transition-all duration-150 flex items-center justify-center text-sm leading-none"
          >
            ‹
          </button>
          <button
            onClick={() => scroll(1)}
            className="w-7 h-7 rounded-lg bg-brand-card border border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-accent/30 transition-all duration-150 flex items-center justify-center text-sm leading-none"
          >
            ›
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={rowRef}
          className="flex gap-3 overflow-x-auto pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {loading
            ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
            : videos.length === 0
            ? (
              <div className="w-full py-8 text-center text-brand-muted text-sm font-ui">
                No videos found for this category.
              </div>
            )
            : videos.map((v, i) => <VideoCard key={v.id?.videoId || i} video={v} />)
          }
        </div>
        <div
          className="absolute top-0 right-0 bottom-2 w-16 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0C0A07 0%, transparent 100%)' }}
        />
      </div>
    </section>
  );
}

export default function Explore() {
  return (
    <div className="min-h-screen bg-brand-bg font-body">
      <div className="relative overflow-hidden border-b border-brand-border">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 120% at 100% 50%, rgba(240,165,0,0.06) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-6 py-10">
          <p className="font-ui text-[10px] font-bold tracking-[0.2em] uppercase text-brand-accent mb-2">Browse</p>
          <h1 className="font-display text-4xl sm:text-5xl text-brand-text">
            Explore the Grid
          </h1>
          <p className="text-brand-muted text-sm mt-2 max-w-md">
            Handpicked categories of the best content. Find what moves you.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-10">
        {CATEGORIES.map(cat => (
          <CategoryRow key={cat.label} category={cat} />
        ))}
      </div>
    </div>
  );
}
