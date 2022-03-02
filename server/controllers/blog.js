const article = require("../models/article")

exports.createArticle= async(req,res)=>{
    const article = new article(req.body )

    try{
        await article.save()
        res.send(200).json({
            success:true,
            message:"new article created" 

        })
    }catch(error){
 
        res.send(500).json({
            success:false, 
            error:error.message
        })
    }
}

