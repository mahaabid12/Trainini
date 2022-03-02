const User = require("../models/user")
const bcrypt=require("bcrypt")
const { updateMany } = require("../models/user")

exports.update=async (req,res,next)=>{
    if(req.body.password){
        req.body.password= await bcrypt.hash(user.req.body.password,10)
    }
 try{
     const updateUser= await User.findByIdAndUpdate(req.params.id,
     {
         $set:req.body,
     },
     {new:true})
     res.status(200).json({
         "message":"user updated",
          updateUser
     })
 }catch(error){
     res.status(500).json(err)
 }
}

exports.Delete=async(req,res,next)=>{
    try{
        await User.findByIdAndDelete(req.params.id); 
        res.status(200).json("User has been deleted")

    }catch(error){
        res.status(500).json(error)
    }

}

exports.getUser= async(req,res,next)=>{
    try{
        const user= await  User.findById(req.params.id)
        if(!user){
            res.status(400).json({
                sucess:false, 
                error:"id not found"
            })
        }

        res.status(200).json({
          success:true, 
          user
        })
    }catch(error){
        res.status(500).json({
            success:false, 
            error:error.message
        })

    }
}



exports.getAllUsers=async (req, res) => {
    const query = req.query.new;
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  