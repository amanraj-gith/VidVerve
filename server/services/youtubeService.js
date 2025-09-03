const axios = require('axios');
const { YOUTUBE_API_KEY } = require('../config/youtubeConfig');

// Fetch videos based on tags
exports.fetchVideosByTags = async (tags) => {
    try {
        // Join tags into a single search query separated by spaces
        const searchQuery = tags.join(' ');

        const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
            params: {
                part: 'snippet',
                maxResults: 20,
                q: searchQuery,
                type: 'video',
                key: YOUTUBE_API_KEY
            }
        });
        return response.data.items;
    } catch (error) {
        console.error('Error fetching videos by tags:', error);
        throw error;
    }
};

// Fetch videos based on a query
exports.fetchVideosByQuery = async (query) => {
    try {
        const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
            params: {
                part: 'snippet',
                maxResults: 20,
                q: query,
                type: 'video',
                key: YOUTUBE_API_KEY
            }
        });
        return response.data.items;
    } catch (error) {
        console.error('Error fetching videos by query:', error);
        throw error;
    }
};
