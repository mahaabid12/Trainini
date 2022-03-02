require("dotenv").config({path:"./config.env"})

const express=require("express")
const mongoose=require("mongoose")
const axios=require("axios")



const app=express() 
mongoose.connect(process.env.MONGO_URL)
     .then(()=>console.log("DB connection successfull! "))   
     .catch((err)=>{console.log(err)})  



app.use(axios)

const port=5000||process.env.PORT

//Import routes
app.use(express.json())//to get data from the body 
app.use('/api/auth',require('./routes/auth'))
app.use('/api/user',require('./routes/user'))




app.listen(port,()=>{
    console.log("app is connected ")
})
 

