import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="relative w-full max-w-lg">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full py-3 pl-4 pr-14 bg-white rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
        placeholder="Search videos…"
        aria-label="Search videos"
      />
      <button
        onClick={handleSearch}
        className="absolute right-0 top-0 h-full px-4 bg-blue-600 rounded-r-xl text-white hover:bg-blue-700 transition-colors"
        aria-label="Search"
      >
        <FaSearch />
      </button>
    </div>
  );
}

export default SearchBar;
