import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyFeed = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetchPersonalizedVideos();
    }, []);

    const fetchPersonalizedVideos = async () => {
        try {
            const token = localStorage.getItem('token'); // or however you store the token
            const response = await axios.get('http://localhost:3001/api/video/personalized', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setVideos(response.data);
        } catch (error) {
            console.error('Failed to fetch personalized videos:', error);
        }
    };

    
    const VideoCard = ({ video }) => (
        <Link to={`/video/${video.id}`}>
            <div className="border rounded-lg shadow pb-2 cursor-pointer h-80 bg-white left-8">
                <img
                    src={video.thumbnail}
                    alt={video.snippet.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                />
                <h3 className="text-lg font-semibold mt-2 p-2">{video.snippet.title}</h3>
                <p className="text-gray-600 pl-2 pt-2">{video.snippet.channelTitle}</p>
            </div>
        </Link>
    );

    return (
        <div className="Main bg-blue-100">
            <h2 className="text-xl font-bold mb-4">My Feed</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {videos.map(video => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </div>
    );
};

export default MyFeed;
