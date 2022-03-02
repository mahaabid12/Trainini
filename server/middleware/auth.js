const jwt=require('jsonwebtoken')
const User= require("../models/user")


const verifyToken=async(req,res,next)=>{
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

const verifyTokenAndAuthorization=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id  || req.user.isAdmin){
            next(); 
        }else{
            res.status(403).json({
                success:false, 
                error:"you're not allowed to do that "
            })
        }
    })
}

const verifyTokenAndAdmin=(req,res,next)=>{
    verifTojen(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            res.status(403).json({
                success:false, 
                error:"you're not allowed to do that "

            })
        }
    })
}


module.exports={
    verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization
}




