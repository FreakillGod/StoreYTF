require('dotenv')
const Admin=require('../models/admin')

const registerAdmin= async (req,res)=>{
    const user= await Admin.create({...req.body})

    const token = user.jwtfy();
    console.log(user)
    res.status(200).json({user:{name:user.getName()},token})
}

const login= async (req,res)=>{
    const{email,password}= req.body;

    if(!email || !password){
        return res.status(402).send({msg:"bad username or password"});
    }
    const user=await Admin.findOne({email});

    if(!user){
        return res.status(401).json({msg:"please enter valid email"});
    }

    const authPassword=await user.comparePassword(password)

    if(!authPassword){
        return res.status(401).json({msg:'password is incorrect'});
    }

    const token=user.jwtfy();

    res.status(200).json({user:{name:user.name},token})
}

module.exports={login,registerAdmin}