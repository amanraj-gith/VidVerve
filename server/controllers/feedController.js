const saveVideoToFeed = async (req, res) => {
    try {
        const { userId, videoId, tags } = req.body;
        const userFeed = new UserFeed({ userId, videoId, tags });
        await userFeed.save();
        res.status(201).send('Video added to feed');
    } catch (error) {
        console.error('Error saving video to feed:', error);
        res.status(500).json({ error: 'Failed to save video to feed' });
    }
};

module.exports = saveVideoToFeed; // Change from 'export default'
