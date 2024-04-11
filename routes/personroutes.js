const express = require("express")
const router=express.Router()

const person=require('./../models/person')
router.post('/',async(req,res)=>{
    try{
        const data=req.body;
        const newperson=new person(data);
        const response=await newperson.save()
        console.log("data saved")
        res.status(200).json(response);
    }
    catch(err){
        console.log("error")
        res.status(500).json({error:'internal error'});
    }

})


router.get('/',async(req,res)=>{
    try{
        const data=await person.find()
        console.log("data fetched")
        res.status(200).json(data);
    }
    catch(err){
        console.log("error")
        res.status(500).json({error:'internal error'});
    }
})

router.get('/:workType',async (req,res)=>{
    try{
        const workType=req.params.workType
        if(workType=='chef'||workType=='waiter'||workType=='manager'){
            const response= await person.find({work:workType})
            console.log("data fetched")
            res.status(200).json(response)
        }
        else{
            res.status(404).json({error:'invalid work type'})
        }

    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'internal server error'})
    }
})


router.put('/:id',async (req,res)=>{
    try{
        const id=req.params.id
        const updatepersondata=req.body
         const response=await person.findByIdAndUpdate(id,updatepersondata,{
            new:true,//return the updated documents
            runValidators:true
        }
    )
        if(!response){
            res.status(404).json({error:"person not found"})
        }
        console.log("data updated")
        res.status(200).json(response)

    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"internal server error"})
    }
})
router.delete('/:id',async (req,res)=>{
    try{
        const id=req.params.id
        const response=await person.findByIdAndDelete(id)
        if(!response){
            res.status(400).json({error:"person not found"})
        }
        console.log("data deleted")
        res.status(200).json({message:"person sucessfully deleted"})
    }
    catch(err){
        res.status(500).json({error:"internal server error"})
    }
})

module.exports=router