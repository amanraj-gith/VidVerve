import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="relative w-full max-w-lg">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        className="w-full py-3 pl-4 pr-14 bg-brand-card border border-brand-border rounded-xl text-brand-text text-sm placeholder:text-brand-muted focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/20 transition-all font-body"
        placeholder="Search videos…"
        aria-label="Search videos"
      />
      <button
        onClick={handleSearch}
        className="absolute right-0 top-0 h-full px-4 bg-brand-accent rounded-r-xl text-brand-bg hover:bg-amber-400 transition-colors font-ui font-bold"
        aria-label="Search"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
  );
}

export default SearchBar;
