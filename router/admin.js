const express= require('express')
const router= express.Router();

const authenticator= require('../middleware/authenticator')
const {login,registerAdmin} = require('../controllers/admin')

router.route('/login').post(authenticator,login);
router.route('/register').post(registerAdmin)

module.exports=router