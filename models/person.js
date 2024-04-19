const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
//define the person schema
const person_schema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String
    }

});

// bcrypt middleware function
person_schema.pre('save', async function(next){
    const person=this
    // hash the password only if it has been new record or modified
    if(!person.isModified('password')) return next()
    try{
        //hash password generation
        const salt=await bcrypt.genSalt(10)
        //hash password
        const hashedpassword=await bcrypt.hash(person.password,salt)
        person.password=hashedpassword
        next()
    }
    catch(err){
        return next(err)
    }
})

person_schema.methods.comparePassword= async function(candidatePassword){
    try{
        //use bcrypt to compare the provided password with the hashed password
        const ismatch=await bcrypt.compare(candidatePassword,this.password)
        return ismatch
    }
    catch(err){
        throw(err)
    }
}

//create person Model
const person=mongoose.model('person',person_schema);
module.exports=person