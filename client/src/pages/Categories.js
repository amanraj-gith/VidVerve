import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Categories() {
    const [videos, setVideos] = useState([]);
    const { tag } = useParams();

    useEffect(() => {
        fetchVideosByTag(tag);
    }, [tag]);

    const fetchVideosByTag = async (tag) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE}/api/video/tags/${tag}`);
            setVideos(response.data);
        } catch (error) {
            console.error('Failed to fetch videos by tag:', error);
        }
    };

    const VideoCard = ({ video }) => (
        <Link to={`/video/${video.id.videoId}`}>
            <div className="border rounded-lg shadow pb-2 cursor-pointer h-80 bg-white">
                <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                />
                <h3 className="text-lg font-semibold mt-2">{video.snippet.title}</h3>
                <p className="text-gray-600 pl-2 pt-2">{video.snippet.channelTitle}</p>
            </div>
        </Link>
    );

    return (
        <div className="Main bg-blue-100 h-screen ">
            <div className="flex flex-col gap-4 pt-4 pl-2">
                <h2 className="text-xl font-bold mb-4 ml-12">{`${tag}`}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {videos.map(video => (
                        <VideoCard key={video.id.videoId} video={video} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Categories;
