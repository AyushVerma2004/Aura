exports.generateCaption= async(req,res)=>{
try{
const {prompt}=req.body;

const captions=[
`Hook your audience with ${prompt}`,
`${prompt} but make it viral 🔥`,
`Stop scrolling — ${prompt}`
]

res.status(200).json({
success:true,
caption:captions[Math.floor(Math.random()*captions.length)]
})
}
catch(error){
res.status(500).json({message:error.message})
}
}
exports.generateHashtags= async(req,res)=>{
try{
const {keyword}=req.body;

res.status(200).json({
success:true,
hashtags:[
`#${keyword}`,
`#${keyword}tips`,
`#viral${keyword}`,
`#contentcreator`,
`#growthhacks`
]
})
}
catch(error){
res.status(500).json({message:error.message})
}
}
exports.generateIdeas= async(req,res)=>{
try{
const {niche}=req.body;

res.status(200).json({
success:true,
ideas:[
`10 Viral ${niche} Reel Ideas`,
`${niche} Carousel Content Strategy`,
`${niche} Content Hooks for Growth`,
`Weekly ${niche} Posting Plan`
]
})
}
catch(error){
res.status(500).json({message:error.message})
}
}
exports.getTrendingContent= async(req,res)=>{
try{
res.status(200).json({
trends:[
{
id:1,
title:'AI Productivity Reels',
platform:'Instagram',
trendScore:97
},
{
id:2,
title:'Faceless Motivation',
platform:'YouTube',
trendScore:92
},
{
id:3,
title:'Storytelling Hooks',
platform:'LinkedIn',
trendScore:89
}
]
})
}
catch(error){
res.status(500).json({message:error.message})
}
}

exports.getAnalytics= async(req,res)=>{
try{
res.status(200).json({
followers:'18.2K',
engagement:'92%',
reach:'144K',
viralPosts:245
})
}
catch(error){
res.status(500).json({message:error.message})
}
}