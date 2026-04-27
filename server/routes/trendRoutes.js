const express = require('express');
const axios = require('axios');
const googleTrends = require('google-trends-api');

const router = express.Router();


// YouTube trending
router.get('/youtube', async (req,res)=>{
try{

const response = await axios.get(
'https://www.googleapis.com/youtube/v3/videos',
{
params:{
part:'snippet,statistics',
chart:'mostPopular',
regionCode:'IN',
maxResults:10,
key:process.env.YOUTUBE_KEY
}
}
)

res.json(response.data.items)

}catch(err){
res.status(500).json({error:err.message})
}
})


// Google trends
router.get('/google', async(req,res)=>{
try{
const data=await googleTrends.dailyTrends({
geo:'IN'
})

res.send(data)

}catch(err){
res.status(500).json({error:err.message})
}
})


module.exports = router;