const express= require('express')
const { register, login, forgotPassword, resetPassword } = require('../controllers/auth')
const User = require('../models/user')

const router=express.Router()



router.post('/register',register)
router.post('/login',login)
router.post('/forgotPassword',forgotPassword)
router.put('/resetPassword/:resetToken',resetPassword)


router.get('/',async(req,res)=>{
    const users= await User.find({})
    res.send(users)
})





module.exports=router