// server/routes/videoRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticateUser = require('../middleware/authMiddleware')
const saveVideoToFeed = require('../controllers/feedController');
const { fetchFeaturedVideos, searchVideos, fetchVideosByTag, fetchPersonalizedVideos} = require('../controllers/videoController');


router.post('/featured', fetchFeaturedVideos);
router.post('/feed', saveVideoToFeed);
router.get('/personalized', authenticateUser, fetchPersonalizedVideos);
router.get('/tags/:tags', fetchVideosByTag);
router.get('/search', searchVideos); 

//for add-to-feeder 
router.post('/add-to-feeder' , async(req,res) => {
    const {userId, tags} = req.body;

    try{
        await User.updateOne(
            {_id: userId},
            { $addToSet: { feeder: { $each: tags} } }
        );
        res.status(200).send('Tags added to feeder');
    }catch (error){
        console.error('Error adding tags to feeder:' , error);
        res.status(500).send('Error adding tags to feeder');
    }
});

module.exports = router;
