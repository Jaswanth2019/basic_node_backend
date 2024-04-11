const express = require("express")
const router=express.Router()

const menu=require('./../models/menu') 


router.post('/',async (req,res)=>{
    try{
        const data=req.body
        const menuitems=new menu(data);
        const response=await menuitems.save()
        console.log('data saved')
        res.status(200).json(response) 
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'internal server error'})
    }
})

router.get('/',async (req,res)=>{
    try{
        const data =await menu.find()
        console.log("data fetched")
        res.status(200).json(data)
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'})
    }

})
router.get('/:tastetype',async (req,res)=>{
    try{
        const tastetype=req.params.tastetype
        if(tastetype=="sweet" || tastetype=="sour" || tastetype=="spicy"){
            const response=await menu.find({taste:tastetype})
            console.log("data fetched")
            res.status(200).json(response)
        }
        else{
            res.status(404).json({error:"invalid taste type"})
        }

    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})
    }
})
router.put('/:id',async (req,res)=>{
    try{
        const id=req.params.id
        const updatedmenu=req.body
        const response=await menu.findByIdAndUpdate(id,updatedmenu)
        if(!response){
            res.status(404).json({error:"menu not found"})
        }
        console.log("menu updated")
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
        const response=await menu.findByIdAndDelete(id)
        if(!response){
            res.status(404).json({error:"menu not found"})
        }
        console.log("menu deleted")
        res.status(200).json({message:"menu got deleted"})

    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"internal server error"})
    }

})

module.exports=router