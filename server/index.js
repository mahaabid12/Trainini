require("dotenv").config({path:"./config.env"})

const express=require("express")
const mongoose=require("mongoose")



const app=express() 
mongoose.connect("mongodb+srv://Trainini:1234@cluster0.rmcev.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

const port=5000||process.env.PORT

//Import routes
app.use(express.json())//to get data from the body 
app.use('/api/auth',require('./routes/auth'))
app.use('/api/private',require('./routes/private'))




app.listen(port,()=>{
    console.log("app is connected ")
})
 

