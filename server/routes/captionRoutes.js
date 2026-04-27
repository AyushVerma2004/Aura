const express = require('express');
const router = express.Router();
const {
 generateCaption,
 generateHashtags,
 generateIdeas,
 getTrendingContent,
 getAnalytics
}= require('../controllers/aiController');

router.post('/caption',generateCaption);
router.post('/hashtags',generateHashtags);
router.post('/ideas',generateIdeas);
router.get('/trending',getTrendingContent);
router.get('/analytics',getAnalytics);

module.exports=router;