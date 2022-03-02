const express=require("express")
const { update, Delete,getUser, getAllUsers} = require("../controllers/user")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middleware/auth")


const router=express.Router()


//updating password
router.put("/:id",verifyTokenAndAuthorization,update) 

//delete user
router.delete("/:id",verifyTokenAndAuthorization, Delete)

//get User 
router.get("/:id", verifyTokenAndAdmin, getUser)

//get all users 
router.get("/", verifyTokenAndAdmin, getAllUsers)

module.exports=router