const express= require('express')
const app=express()



app.use("/test",(req,res)=>{
    res.send("hello world")
})

app.use("/demo",(req,res)=>{
    res.send("this is only for demo purpose")
})

app.use("/",(req,res)=>{
    res.send("this is home")
})
app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})
