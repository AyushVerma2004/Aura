require('dotenv').config()

const express=require('express')
const cors=require('cors')
const trendRoutes=require('./routes/trendRoutes')

const app=express()

app.use(cors())
app.use(express.json())

//app.use('/api/trends',trendRoutes)
app.use('/api',captionRoutes)

app.listen(5000,()=>{
console.log('running')
})