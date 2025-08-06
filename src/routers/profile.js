const express=require('express')
const profileRouter= express.Router();
const {userAuth}=require("../middlewares/auth")
const validateEditProfileData= require("../utils/validate")

profileRouter.get("/user/profile/view",userAuth,async(req,res)=>{
    const user=req.user

    res.send(user)

})

//Edit user profile
profileRouter.patch("/user/profile/edit",userAuth,async(req,res)=>{
    
    try{
        if(!validateEditProfileData(req.body)){
            return res.status(400).send("Invalid update fields")
        }
        const user=req.user
        
        Object.keys(req.body).forEach((key)=> user[key]=req.body[key])

        await user.save();

        res.status(200).json({
          message: "Profile updated successfully",
          data: user
        });
    }
    catch(err){
        return res.status(400).send("Bad Request: " + err.message);
    }
    
})

module.exports=profileRouter