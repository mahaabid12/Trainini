const jwt=require('jsonwebtoken')
const User= require("../models/user")


exports.protect=async(req,res,next)=>{
    let token; 

    if(req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer") ){
            token=req.headers.authorization.split(" ")[1]; 
        }

    if(!token){
        res.status(401).json({
            success:false, 
            error:"Not authorized to acces this route"
        })
    }

    try{
        const decoded= jwt.verify(token, process.env.JWT_SECRET)
        const user=await User.findOne({id:decoded.id})

            if(!user){
                res.status(401).json({
                    success:false, 
                    error:"No User found with this id"
                })
                

            }
            req.user=user
            next()
    } catch(error){
        res.status(401).json({
            success:false, 
            error:error.message
        })

    }


    
}
