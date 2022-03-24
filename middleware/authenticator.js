require('dotenv')
const jwt= require('jsonwebtoken')
const User=require('../models/admin')

const authenticator= async (req,res,next)=>{

    const authHeader= req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({msg:"not valid user :("})
    }

    const token=authHeader.split(' ')[1];
    
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user={userId:decoded.userId, name:decoded.name};

        next()

    } catch (error) {
        res.status(505).json({msg:'server error'})
    }
}

module.exports=authenticator