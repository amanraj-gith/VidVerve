import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CATEGORY_EMOJI = {
  'Technology': '💻',
  'Fitness': '🏋️',
  'Travel': '✈️',
  'Entertainment': '🎬',
};

function getEmoji(tag) {
  for (const [key, emoji] of Object.entries(CATEGORY_EMOJI)) {
    if (tag.toLowerCase().includes(key.toLowerCase())) return emoji;
  }
  return '🎬';
}

function getInitials(name = '') {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

function StatCard({ value, label }) {
  return (
    <div className="bg-brand-card border border-brand-border rounded-xl p-5 text-center">
      <p className="font-display text-4xl text-brand-accent mb-1">{value}</p>
      <p className="font-ui text-xs font-semibold tracking-widest uppercase text-brand-muted">{label}</p>
    </div>
  );
}

export default function UserProfile() {
  const { user, logout } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${process.env.REACT_APP_API_BASE}/api/video/my-tags`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch {
      setStats({ totalSaved: 0, tags: [] });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveTag = async (tag) => {
    setRemoving(tag);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_BASE}/api/video/remove-tag`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { tag },
      });
      setStats(prev => ({
        ...prev,
        totalSaved: prev.totalSaved - (prev.tags.find(t => t.tag === tag)?.count || 0),
        tags: prev.tags.filter(t => t.tag !== tag),
      }));
    } catch {
      alert('Failed to remove — please try again.');
    } finally {
      setRemoving(null);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg font-body">
      {/* Header band */}
      <div className="relative overflow-hidden border-b border-brand-border">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 100% at 0% 50%, rgba(240,165,0,0.07) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-4xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar */}
          <div
            className="shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-ui font-extrabold text-brand-bg"
            style={{ background: 'linear-gradient(135deg, #F0A500, #E05A3A)' }}
          >
            {getInitials(user?.name)}
          </div>

          {/* User info */}
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-3xl sm:text-4xl text-brand-text truncate">{user?.name}</h1>
            <p className="text-brand-muted text-sm mt-1 font-body">{user?.email}</p>
          </div>

          <button
            onClick={logout}
            className="shrink-0 font-ui font-semibold text-xs tracking-wide px-4 py-2 rounded-lg border border-brand-accent-2/30 text-brand-accent-2 hover:bg-brand-accent-2 hover:text-brand-bg transition-all duration-150"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-10">

        {/* Stats */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-brand-card border border-brand-border rounded-xl p-5 text-center animate-pulse">
                <div className="h-9 skeleton rounded w-16 mx-auto mb-2" />
                <div className="h-3 skeleton rounded w-20 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <StatCard value={stats?.totalSaved ?? 0} label="Videos Saved" />
            <StatCard value={stats?.tags?.length ?? 0} label="Topics Followed" />
            <StatCard
              value={stats?.tags?.[0] ? `#${stats.tags[0].tag.split(' ').slice(-1)[0]}` : '—'}
              label="Top Interest"
            />
          </div>
        )}

        {/* Interests */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <h2 className="font-ui font-bold text-brand-text text-base tracking-tight uppercase text-xs tracking-widest">
              Your Interests
            </h2>
            <div className="flex-1 h-px bg-brand-border" />
            <Link to="/myfeed" className="text-brand-accent text-xs font-ui font-semibold hover:underline">
              View Feed →
            </Link>
          </div>

          {loading ? (
            <div className="flex flex-wrap gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-10 w-36 skeleton rounded-xl" />
              ))}
            </div>
          ) : stats?.tags?.length === 0 ? (
            <div className="bg-brand-card border border-brand-border rounded-2xl p-10 text-center">
              <p className="text-3xl mb-3">🎯</p>
              <p className="font-ui font-bold text-brand-text mb-1">No interests saved yet</p>
              <p className="text-brand-muted text-sm mb-5">Add videos to your feed from the Dashboard to start building your profile.</p>
              <Link
                to="/dashboard"
                className="inline-block font-ui font-bold text-sm px-5 py-2.5 rounded-xl bg-brand-accent text-brand-bg hover:bg-amber-400 transition-colors"
              >
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {stats.tags.map(({ tag, count }) => (
                <div
                  key={tag}
                  className="group flex items-center gap-2 pl-3 pr-2 py-2 bg-brand-card border border-brand-border rounded-xl hover:border-brand-accent/30 transition-all duration-200"
                >
                  <span className="text-lg">{getEmoji(tag)}</span>
                  <span className="font-body text-sm text-brand-text max-w-[160px] truncate">{tag}</span>
                  <span className="font-ui text-xs font-bold text-brand-bg bg-brand-accent rounded-md px-1.5 py-0.5 leading-none">
                    {count}
                  </span>
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    disabled={removing === tag}
                    className="ml-1 w-5 h-5 rounded-md flex items-center justify-center text-brand-muted hover:text-brand-accent-2 hover:bg-brand-accent-2/10 transition-all duration-150 disabled:opacity-40"
                    title="Remove interest"
                  >
                    {removing === tag ? '…' : '×'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Explore CTA */}
        <div className="bg-brand-card border border-brand-border rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-ui font-bold text-brand-text mb-1">Discover something new</p>
            <p className="text-brand-muted text-sm">Browse curated categories and expand your feed.</p>
          </div>
          <Link
            to="/explore"
            className="shrink-0 font-ui font-bold text-sm px-5 py-2.5 rounded-xl border border-brand-accent/30 text-brand-accent hover:bg-brand-accent hover:text-brand-bg transition-all duration-200"
          >
            Explore →
          </Link>
        </div>

      </div>
    </div>
  );
}
