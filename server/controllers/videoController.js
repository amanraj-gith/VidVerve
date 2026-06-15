// server/controllers/videoController.js
const youtubeService = require('../services/youtubeService');
const User = require('../models/User');
const UserFeed = require('../models/UserFeed');

// Controller to add video to the personalized feeder
exports.addVideoToFeeder = async (req, res) => {
    try {
        const userId = req.user._id;
        const { videoId, tags } = req.body;

        if (!tags || tags.length === 0) {
            return res.status(400).send('Tags are required');
        }

        const userFeed = new UserFeed({
            userId,
            tags,
            videoId
        });

        await userFeed.save();

        res.status(200).send('Video added to your feeder successfully!');
    } catch (error) {
        console.error('Error adding video to feeder:', error);
        res.status(500).send('Server error');
    }
};

// Controller to get featured videos
exports.fetchFeaturedVideos = async (req, res) => {
    try {
        const query = req.body.query || 'featured';
        const video = await youtubeService.fetchVideosByQuery(query); 
        res.json(video);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
};

// Controller to get personalized Content as per User
exports.fetchPersonalizedVideos = async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch tags stored in UserFeed
        const userFeeds = await UserFeed.find({ userId });

        if (!userFeeds || userFeeds.length === 0) {
            return res.status(200).json([]); // No personalized content
        }

        const tags = userFeeds.map(feed => feed.tags).flat();

        // Fetch videos based on tags
        const videos = await youtubeService.fetchVideosByTags(tags);
        const normalized = (videos || []).map(v => ({
            id: v.id.videoId,
            thumbnail: v.snippet.thumbnails?.medium?.url,
            snippet: v.snippet
        }));
        res.json(normalized);
    } catch (error) {
        console.error('Error fetching personalized videos:', error);
        res.status(500).send('Server error');
    }
};

// Controller to get videos by tag
exports.fetchVideosByTag = async (req, res) => {
    try {
        // Get tags from URL parameters
        const tags = req.params.tags ? req.params.tags.split(',') : [];
         console.log(tags);
        // Validate tags
        if (tags.length === 0) {
            return res.status(400).send('No tags provided');
        }

        // Fetch videos for each tag
        const allVideos = [];
        for (const tag of tags) {
            console.log(`Fetching videos for tag: ${tag}`); 
            const videos = await youtubeService.fetchVideosByTags([tag]);
            allVideos.push(...videos);
        }

        // Remove duplicates by videoId
        const uniqueVideos = allVideos.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.id.videoId === value.id.videoId
            ))
        );

        // Send all collected videos
        res.json(uniqueVideos);
    } catch (error) {
        console.error('Error fetching videos by tags:', error);
        res.status(500).send('Server error');
    }
};

// Controller to search for videos
exports.searchVideos = async (req, res) => {
    try {
        const query = req.query.q || ''; // Get search query from request
        if (!query) {
            return res.status(400).send('Query parameter is required');
        }

        const videos = await youtubeService.fetchVideosByQuery(query);
        res.json(videos);
    } catch (error) {
        console.error('Error searching videos:', error);
        res.status(500).send('Server error');
    }
};
