const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')
const crypto= require('crypto')


var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


const userSchema=new mongoose.Schema({
    name:{
        type: String, 
        required:true
    
    }, 
  
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }, 
    password:{
        type:String, 
        require:[true,"Please add a password"], 
        minlength:6, 
        select:false

    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date 

}); 



userSchema.pre('save', async function(next){
    const user=this; 
    if (user.isModified('password')){
        //const salt= await bcrypt.gensalt(10)
        user.password=await bcrypt.hash(user.password,10)
        next();
    }else{
        next();
    }
})

userSchema.methods.verify= async function (password){
    const isMatch= await bcrypt.compare(password, this.password); 
    return isMatch; 
}


userSchema.methods.getSignedToken= function(){
    return jwt.sign({id:this._id, isAdmin:this.isADMIN}, process.env.JWT_SECRET, { expiresIn:process.env.JWT_EXPIRE})
}

userSchema.methods.getResetPasswordToken=function(){
    const resetToken= crypto.randomBytes(20).toString("hex")
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExpire=Date.now()+10*(60*100); 
    return resetToken
}  



const User= mongoose.model("User",  userSchema); 
module.exports=User; 