// server/routes/videoRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticateUser = require('../middleware/authMiddleware')
const saveVideoToFeed = require('../controllers/feedController');
const { fetchFeaturedVideos, searchVideos, fetchVideosByTag, fetchPersonalizedVideos, addVideoToFeeder } = require('../controllers/videoController');


router.post('/featured', fetchFeaturedVideos);
router.post('/feed', saveVideoToFeed);
router.get('/personalized', authenticateUser, fetchPersonalizedVideos);
router.get('/tags/:tags', fetchVideosByTag);
router.get('/search', searchVideos);
router.post('/add-to-feeder', authenticateUser, addVideoToFeeder);

module.exports = router;
