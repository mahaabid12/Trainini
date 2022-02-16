const express=require("express")
const mongoose=require("mongoose")

const app=express() 

const port=3000||process.env.PORT

//Import routes

const authRoute= require('./routes/auth'); 





app.listen(port,()=>{
    console.log("app is connected ")
})