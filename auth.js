//passport middleware
const passport=require('passport')
const localstrategy=require('passport-local').Strategy

const person=require('./models/person')

passport.use(new localstrategy(async (USERNAME,password,done)=>{
    //authentication code 
    try{
        console.log("credentials recieved",USERNAME,password)
        const user=await person.findOne({username:USERNAME})
        if(!user){
            return done(null,false,{message:'incorrect username'})
        }
        const passwordmatch=user.password===password?true:false
        if(passwordmatch){
            return done(null,user)
        }
        else{
            return done(null,false,{message:'incorect password'})
        }
    }
    catch(err){
        return done(err)
    }
}))
// export configured passport
module.exports=passport