//express
const express=require('express')
var app=express()

//database 
const db=require('./db')
// .env file using
require('dotenv').config();
const port=process.env.PORT ||3000

//body parser
const bodyparser=require('body-parser');
app.use(bodyparser.json());

//  const person=require('./models/person')
// const menu=require('./models/menu')


//middleware function
const logRequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Made to :${req.originalUrl}`)
    // to move to next stage we use the next
    next() 
}
app.use(logRequest)

const personroutes=require('./routes/personroutes')
const menuroutes=require('./routes/menuroutes')

app.use('/person',personroutes)
app.use('/menu',menuroutes)

app.get('/',(req,res)=>{
    res.send("i created a server")
})




//post method to post the details of the person
// app.post('/person',async(req,res)=>{
//     try{
//         const data=req.body;
//         const newperson=new person(data);
//         const response=await newperson.save()
//         console.log("data saved")
//         res.status(200).json(response);
//     }
//     catch(err){
//         console.log("error")
//         res.status(500).json({error:'internal error'});
//     }

// })

// post method to get the details of the menu items
// app.post('/menu',async (req,res)=>{
//     try{
//         const data=req.body
//         const menuitems=new menu(data);
//         const response=await menuitems.save()
//         console.log('data saved')
//         res.status(200).json(response) 
//     }
//     catch(err){
//         console.log(err)
//         res.status(500).json({error:'internal server error'})
//     }
// })


//get method to get the details of the person
// app.get('/person',async(req,res)=>{
//     try{
//         const data=await person.find()
//         console.log("data fetched")
//         res.status(200).json(data);
//     }
//     catch(err){
//         console.log("error")
//         res.status(500).json({error:'internal error'});
//     }
// })

// get method to get the details of the menu items
// app.get('/menu',async (req,res)=>{
//     try{
//         const data =await menu.find()
//         console.log("data fetched")
//         res.status(200).json(data)
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error:'Internal server error'})
//     }

// })


app.listen(port,()=>{
    console.log('i am listening')
})

//query params
// app.get('/person/:workType',async (req,res)=>{
//     try{
//         const workType=req.params.workType
//         if(workType=='chef'||workType=='waiter'||workType=='manager'){
//             const response= await person.find({work:workType})
//             console.log("data fetched")
//             res.status(200).json(response)
//         }
//         else{
//             res.status(404).json({error:'invalid work type'})
//         }

//     }
//     catch(err){
//         console.log(err)
//         res.status(500).json({error:'internal server error'})
//     }
// })




//old method using call back function
// app.post('/person',(req,res)=>{
//     // assuming the request body contains the person data
//     const data=req.body
//     //create a new person document using MOngoose model
//     const newperson=new person(data)

//     //save the new person to the database
//     newperson.save((error,savedperson)=>{
//         if(error){
//             console.log('erroe saving person',error)
//             res.status(500).json({error:'internal server error'})
//         }
//         else{
//             console.log("data saved sucessfully");
//             res.status(200).json({savedperson})
//         }
//     })
// })