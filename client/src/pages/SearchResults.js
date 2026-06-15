import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
    const [videos, setVideos] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('q');
        if (query) {
            fetchSearchResults(query);
        }
    }, [location.search]);

    const fetchSearchResults = async (query) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE}/api/video/search`, {
                params: { q: query }
            });
            if (Array.isArray(response.data)) {
                setVideos(response.data);
            } else {
                console.error('Unexpected data format:', response.data);
                setVideos([]);
            }
        } catch (error) {
            console.error('Failed to fetch search results:', error);
            setVideos([]);
        }
    };

    return (
        <div>
            <h2>Search Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {videos.length > 0 ? (
                    videos.map(video => (
                        <div key={video.id.videoId} className="border rounded-lg shadow pb-2 cursor-pointer h-80">
                            <iframe
                                width="100%"
                                height="200"
                                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                                title={video.snippet.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                loading="lazy"
                                className="rounded-lg"
                            ></iframe>
                            <h3 className="text-lg font-semibold mt-2">{video.snippet.title}</h3>
                            <p className="text-gray-600 pl-2 pt-2">{video.snippet.channelTitle}</p>
                        </div>
                    ))
                ) : (
                    <p>No videos found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
