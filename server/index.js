const express=require("express")
const mongoose=require("mongoose")

const app=express() 
mongoose.connect()
const port=3000||process.env.PORT




app.listen(port,()=>{
    console.log("app is connected ")
})