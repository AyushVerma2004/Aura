exports.registerUser=(req,res)=>{
const {name,email}=req.body;

res.json({
message:'User Registered',
user:{name,email}
})
}

exports.loginUser=(req,res)=>{
res.json({
message:'Login successful',
token:'demo-jwt-token'
})
}

exports.getProfile=(req,res)=>{
res.json({
name:'Ayush',
plan:'Premium Creator'
})
}