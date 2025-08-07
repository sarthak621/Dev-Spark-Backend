const express= require('express')
const userRouter= express.Router()

const {userAuth}= require('../middlewares/auth')
const  ConnectionRequestModel = require('../models/connectionRequest')
const User= require("../models/userSchema")

userRouter.get("/user/request/received",userAuth, async(req,res)=>{
    try{
          const loggedInUser= req.user

          const connectionRequests=await ConnectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: "interested"
          }). populate('fromUserId', "firstName lastName age gender about skills profileUrl")
          .lean()

          res.json({
            message:"Data fetched successfully",
            data: connectionRequests
          })
    }
    catch(err){
        return res.status(400).send("Bad Request: " + err.message);
    }
})


// user/connection api
userRouter.get("/user/connection", userAuth , async(req,res)=>{
    try{
        const loggedInUser = req.user

        const connectionRequest= await ConnectionRequestModel.find({
            $or:[
                {fromUserId: loggedInUser._id, status:"accepted"},
                {toUserId:loggedInUser._id, status:"accepted" }
            ]
        }). populate("fromUserId", "firstName lastName age gender about skills profileUrl")
      .populate("toUserId", "firstName lastName age gender about skills profileUrl")
      .lean();

      const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ data });


    }
    catch(err){
        return res.status(400).send("Bad Request: " + err.message);
    }
})


// creating the feed api
userRouter.get("/feed",userAuth,async(req,res)=>{
  try{
     const loggedInUser=req.user

     const page = parseInt(req.query.page) || 1;
     let limit = parseInt(req.query.limit) || 20;
     limit = limit > 50 ? 50 : limit;
     const skip = (page - 1) * limit;

     const connectionRequest= await ConnectionRequestModel.find({
       $or:[
          {fromUserId: loggedInUser._id},
          {toUserId: loggedInUser._id} 
       ]
     }).select("fromUserId toUserId")


     //ab hame mil gaya hai logged in user kidhar kidhar connect hai
     // now , hame sare connected Request ko hide karna hoga 
     // kyuki hame feed me sab new people chaiye

     const hideUserFromFeed= new Set();
        connectionRequest.forEach((req)=>{
            hideUserFromFeed.add(req.fromUserId.toString())
            hideUserFromFeed.add(req.toUserId.toString())
        })
     
     
     // hideUserFromFeed ko exclude kar do id se
     
     const users= await User.find({
        $and: [
          { _id: { $nin: Array.from(hideUserFromFeed) } }, // not connected/sent/received
          { _id: { $ne: loggedInUser._id } }                // not yourself
        ],
     }).select("firstName lastName age gender about skills profileUrl")
        .skip(skip)
        .limit(limit)

     res.json({
      data:users
     })

  }
  catch(err){
    return res.status(400).send("Bad request: "+ err.message)
  }
})

module.exports=userRouter



// // //  $or:[
// // //                 {fromUserId: loggedInUser._id, status:"accepted"},
// // //                 {toUserId:loggedInUser._id, status:"accepted" }
// // //             ]
// // 
// // // This means:
// // 
// // // Find all connection requests where:
// // 
// // // The logged-in user sent the request and it was accepted,
// // // OR
// // 
// // // The logged-in user received the request and accepted it.

