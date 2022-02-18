const User = require("../models/user");
const sendEmail = require("../utils/sendEmail");
const crypto=require('crypto')

exports.register= async(req,res,next)=>{
  const {name, email,password}=req.body ; 
  try{
const user=await User.create({
    name, 
    email, 
    password
}); 

sendToken(user,201,res)


} catch(error){
    res.status(500).json({
        success:false, 
        error:error.message
    })
}


  
  
  

}

exports.login= async(req,res,next)=>{

    const{email, password}=req.body
    if(!email || !password){
        res.status(400).json({
            success:false, 
            error:"please enter your cridentials "
        })
    }
 

    try{
        const user= await User.findOne({email}).select("+password")
        if(!user){
            res.status(400).json({
                success:false, 
                error:"please modify your email  "
            })

        }

        const isMatch= await user.verify(password) 
        if(!isMatch){
            res.status(400).json({
                success:false, 
                error:"please modify your password  "
            })

        } 


        sendToken(user,200,res) 
        

        
      
    }catch(error){
        res.status(500).json({
            error: error.message


        })
    }
   




   

    
   
}

exports.forgotPassword= async(req,res,next)=>{
    const {email}=req.body 
    try{
    const user= await User.findOne({email}) 
    if(!user){
        res.status(401).json({
            success:false, 
            message:"you're not in the database"
        })
    }

    //generate a hash token 
    const resetToken=user.getResetPasswordToken()
    await user.save(); 
    const resetUrl='http://localhost:3000/passwordreset/'+resetToken
    const message='Please click up on this'+resetUrl  

    try{
        await sendEmail({
            to:user.email, 
            subject:"Password Reset Request ", 
            text:message

        })
        res.status(200).json({
            success:true, 
            data:"Email sent"
        })
        console.log(resetUrl)


    }catch(error){
        user.resetPasswordToken=undefined; 
        user.resetPasswordExpire=undefined; 

        await user.save(); 

        res.status(500).send({
            success:false, 
            error:error.message
        })
    }
 
     



} catch(error){
    res.status(400).send({
        success:false, 
        error:error.message
    })

}


   
}

exports.resetPassword= async(req,res,next)=>{

    const passwordToken= crypto.createHash("sha256").update(req.params.resetToken).digest("hex")
    try{
        const user= await User.findOne({
            resetPasswordToken: passwordToken, 
            resetPasswordExpire:{$gt:Date.now()}
             
        })


        if(!user){
            res.status(400).send({
                success:false, 
                error:error.message
            })
            next()
         
        }


        user.password=req.body.password
        user.resetPasswordToken=undefined; 
        user.resetPasswordExpire=undefined; 
       

        await user.save(); 

        res.status(201).json({
            success:true, 
            data:"password reset success"
        })
    
    }catch(error){
        res.status(401).send({
            success:false, 
            error:error.message
        })

    }
}


const sendToken=(user,statusCode,res)=>{
    const token=user.getSignedToken(); 
    res.status(statusCode).json({
        success:true, 
        token 
    })
}
