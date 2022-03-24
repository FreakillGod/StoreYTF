const mongoose= require('mongoose');

const storeModal=new mongoose.Schema({
    name:{
        type:String,
        require:[true,'please enter name of the product'],
        maxlenght:[25,'character length is greater than 25']
    },
    price:{
        type:Number,
        required:[true,'provied valid price'],
    },
    featured:{
        type:Boolean,
        default:false,
    },
    rating:{
        type:Number,
        default:4.0,
    },
    brandName:{
        type:String,
        enum:{
            values:['nike','adidas','boot','sparx','localBrand'],
            message:'{VALUE} is not supported',
            default:'localBrand'
        }
    },
})

module.exports=mongoose.model('Product',storeModal);