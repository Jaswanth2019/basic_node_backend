const mongoose=require('mongoose');
require('dotenv').config();
// local url
// const mongoURl='mongodb://localhost:27017/mydatabase'
// mydatabase is the name of the mongodb database

// online url 
const mongoURl=process.env.MONGODB_URL
//setup Mongodb connection
mongoose.connect(mongoURl,{})

const db=mongoose.connection;

//defining event listeners for database connection

db.on('connected',()=>{
    console.log('connected to mongoDb server');
})

db.on('error',(err)=>{
    console.log('MOngoDB connection error',err);
})

db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
})

//export the database connection
module.exports=db