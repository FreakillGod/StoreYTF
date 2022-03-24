const express= require('express')
const Product= require('../models/storeModal')

const getAllProducts=async (req,res)=>{
    try {
        const product=await Product.find({})

        if(product){
            return res.status(200).json({msg:'success',product})
        }
        res.status(402).json({msg:'bad request please try again later'})
    } catch (error) {
        res.status(500).json({error})
    }
}

const getProduct=async(req,res)=>{
    const {params:{id:productId}}= req;

    const product= await Product.findOne({_id:productId })

    if(!product){
        return res.status(402).json({msg:'cannot find product with specific id'})
    }
    res.status(200).json({msg:'success',product})
}

const addProduct=async(req,res)=>{
    const newProduct=await Product.create(req.body)
    
    res.status(201).json({product:newProduct})
}

const updateProduct=async(req,res)=>{
    const{body:{name,price,featured,rating,brandName},
    params:{id:productId}}=req;

    if(name==='',price==='',brandName===''){
        return res.status(401).json({msg:'empty value error'})
    }
    const product=await Product.findByIdAndUpdate({_id:productId}, req.body,{new:true, runValidators:true})

    if(!product){
        return res.status(401).json({msg:'no product with given id'})
    }

    res.status(200).json({msg:'success',product});
}

const deleteProduct=async(req,res)=>{
    const {id:productId}=req.params;

    const product=await Product.findByIdAndRemove({_id:productId})

    if(!product){
        return res.status(401).json({msg:'success',product})
    }
    res.status(200).json({product})
}

module.exports={getAllProducts,getProduct,updateProduct,addProduct,deleteProduct};