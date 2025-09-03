import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

function SearchBar() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div className="h-40 w-full bg-[#3ABEF9] flex justify-start items-center px-12">
            <div className="relative w-96  shadow-custom-black rounded-3xl">
                <label className="sr-only" htmlFor="search-input">
                    Search
                </label>
                <div className="absolute inset-y-0 right-0 flex items-center pl-3">
                    <FaSearch
                        onClick={handleSearch}
                        className="text-white w-10 rounded-e-3xl h-11 py-3 bg-blue-600 hover:text-black hover:bg-blue-700 cursor-pointer"
                    />
                </div>
                <input
                    type="text"
                    id="search-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="block w-full py-2 pl-10 pr-3 border-2 bg-slate-300 border-gray-500 rounded-3xl shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Search"
                />
            </div>
        </div>
    );
}

export default SearchBar;
