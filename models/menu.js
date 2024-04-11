const mongoose=require('mongoose')

const menu_schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:['sweet','sour','spicy'],
        required:true
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:[String],
        default:[]
    },
    sales:{
        type:Number,
        default:0,
    }
})
const menu=mongoose.model('menu',menu_schema);
module.exports=menu