const express=require('express')
const authRouter= express.Router()
const User= require("../models/userSchema")
const bctrypt=require('bcrypt')
const jwt = require('jsonwebtoken')




authRouter.post("/user/signup",async(req,res)=>{
    //creating a new instance of the user model
    // const user=new User(req.body)
    
    //saving the user
    try{
        const {firstName, lastName, age, email, password,profileUrl,gender,skills}=req.body
        
        const passwordHash=await bctrypt.hash(password,10)

        const user=new User({firstName, lastName, age, email, password:passwordHash,profileUrl,gender,skills})
        await user.save()
        res.send("user created successfully")
    }
    catch(err){
        res.status(400).send(err.message)
    }
})


authRouter.post("/user/login",async(req,res)=>{
    try{
        const {email,password}=req.body

        const user= await User.findOne({email:email})

        //compare the passowrd
        // const isPasswordValid=await bctrypt.compare(password,user.password)
        const isPasswordValid=await user.passwordMatch(password)

        if(!isPasswordValid){
            throw new Error("Invalid credentials")
        }
        else{
            //password is valid
            
            //creating a jwt token 
            // const token = await jwt.sign({_id:user._id},"NAMASTENODES2",{expiresIn:"1h"})
            const token= await user.getJWT()   /// writing this in userSchema.js file
            //this token will create the token
            // res.cookie("token", token)
            res.cookie("token", token, {
                httpOnly: true,
                sameSite: "Lax",       // or "None" if using HTTPS
                secure: false,         // set true only in production with HTTPS
            });


            // res.send("user logged in successfully")
            res.send(user)

        }

    }
    catch(err){
        res.status(400).send(err.message)
    }
})


authRouter.post("/user/logout",async(req,res)=>{
    res.cookie("token",null,{expires:new Date(Date.now())})

    res.send("user logged out successfully")
})


module.exports=authRouter