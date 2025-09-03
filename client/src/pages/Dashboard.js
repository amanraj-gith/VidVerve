import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import InterestTag from '../components/InterestTag';
import { Link } from 'react-router-dom';

function Dashboard() {
    const [videos, setVideos] = useState([]);
    const [featuredVideos, setFeaturedVideos] = useState([]);

    useEffect(() => {
        fetchFeaturedVideos();
    }, []);

    const fetchFeaturedVideos = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/video/featured', {
                query: 'latest tech trends'
            });

            // Ensure video objects have thumbnails
            const processedVideos = response.data.map(video => ({
                ...video,
                id: video.id.videoId,
                thumbnail: video.snippet.thumbnails.medium.url // Add thumbnail URL
            }));

            setFeaturedVideos(processedVideos);
        } catch (error) {
            console.error('Error fetching featured videos:', error);
        }
    };

    const handleSearch = (query) => {
        axios.get(`http://localhost:3001/api/video/search`, {
            params: { q: query }
        })
        .then(response => {
            setVideos(response.data);
        })
        .catch(error => {
            console.error('Failed to fetch search results:', error);
        });
    };

    const handleAddToFeeder = async (videoId, tags) => {
        try {
            await axios.post('http://localhost:3001/api/video/add-to-feeder', {
                videoId: videoId,
                tags: tags,
            });
            alert('Video added to your feeder!');
        } catch (error) {
            console.error('Failed to add video to feeder:', error);
            alert('Failed to add video to feeder');
        }
    };

    const VideoCard = ({ video }) => {
        // Example tags; adjust according to your video structure
        const tags = video.snippet.tags || [];
        console.log(tags)
        console.log(video)

        return (
            <div className="border rounded-lg shadow pb-2 cursor-pointer h-80 bg-white left-8">
                <Link to={`/video/${video.id}`}>
                    <img
                        src={video.thumbnail}
                        alt={video.snippet.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <h3 className="text-lg font-semibold mt-2 p-2 max-w-80 overflow-hidden text-ellipsis whitespace-nowrap">
                        {video.snippet.title}
                    </h3>
                <p className="text-gray-600 pl-2 pt-2">{video.snippet.channelTitle}</p>
                </Link>
                <button
                    onClick={() => handleAddToFeeder(video.id, tags)}
                    className="w-full mt-2 bg-blue-500 text-white py-2 rounded-b-lg hover:bg-blue-600"
                >
                    Add to Feeder
                </button>
            </div>
        );
    };

    return (
        <div className="Main bg-blue-100 h-screen">
            <div className='flex'>
                <div className='relative w-screen shadow-2xl'>    
                    <SearchBar onSearch={handleSearch} />
                </div>
                <div className='absolute right-16 top-16'>
                    <InterestTag/>
                </div>
            </div>
            <div className="flex flex-col gap-4 mt-4 ">
                <div>
                    <h2 className="text-xl font-bold mb-4 ml-10">Featured Content</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                        {featuredVideos.map(video => (
                            <VideoCard key={video.id} video={video} />
                        ))}
                    </div>
                </div>
            </div>
            <span className='m-20'></span>
        </div>
        
    );
}

export default Dashboard;
