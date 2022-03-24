require('dotenv')

const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')

const mongoose= require('mongoose')

const adminSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter your name'],
        minlenght:3,
        maxlength:25,
    },
    email:{
        type:String,
        required:[true,'please enter valid email'],
        unique:[true,'email is already in use']
    },
    password:{
        type:String,
        required:[true,'please enter password'],
        minlength:5,
    },
})

adminSchema.pre('save',async function(){
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt)
})


adminSchema.methods.getName=function(){
    return this.name;
}

adminSchema.methods.jwtfy= function(){
    return jwt.sign({userId:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn:'30d'})
}

adminSchema.methods.comparePassword=async function(adminPassword){
    const isMatch=await bcrypt.compare(adminPassword,this.password)
    return isMatch;
}

module.exports=mongoose.model('Admin',adminSchema);