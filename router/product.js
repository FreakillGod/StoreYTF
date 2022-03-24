const express= require('express')
const router= express.Router();

const authenticator=require('../middleware/authenticator')

const {getAllProducts,getProduct,updateProduct,addProduct,deleteProduct} =require('../controllers/products')

router.route('/').get(getAllProducts).post(authenticator,addProduct)
router.route('/:id').get(getProduct).patch(authenticator,updateProduct).delete(authenticator,deleteProduct)

module.exports=router;