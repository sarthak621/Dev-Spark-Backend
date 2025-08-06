//class 12 

const express=require('express')
const requestRouter= express.Router();
const {userAuth}=require("../middlewares/auth")
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/userSchema");

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
     
    try{
        const fromUserId= req.user._id;
        const toUserId= req.params.toUserId;
        const status= req.params.status;
        
        // corner cases

        //while sending a request, status can only be "ignored" or "interested"
        const allowedStatus=["ignored","interested"]
        if(!allowedStatus.includes(status)){
            return res.status(400).send("Invalid status for sending a request");
        }
        
        // checking whether the user is present in the database
        const toUser= await User.findById(toUserId)
        if(!toUser){
            return res.status(404).send("User not found");
        }

        // checking it is not the existing connection request
        const existingConnectionRequest= await ConnectionRequestModel.findOne({
            $or:[
                {fromUserId : fromUserId, toUserId : toUserId}, //checking sender already sent a request
                {fromUserId : toUserId, toUserId : fromUserId}  //checking receiver already sent a request
            ]
        })

        if(existingConnectionRequest){
            return res.status(400).send("Connection request already exists");
        }

        //creating a new connection rquest
        const newConnectionRequest = new ConnectionRequestModel({
            fromUserId : fromUserId,
            toUserId: toUserId,
            status: status
        })

        //save the user
        const data=await newConnectionRequest.save()

        res.json({
            message: req.user.firstName + " is " + status + " in " + toUser.firstName,
            data
        })




    }
    catch(err){
        return res.status(400).send("Bad Request: " + err.message);
    }
})


// "accepted","rejected" API
requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
  try{
    const loggedInUser=req.user
    const {status,requestId}= req.params
    
    //i. checking whether the status is valid 
    const allowedStatus=["accepted","rejected"]
    if(!allowedStatus.includes(status)){
        return res.status(400).send("Invalid status for reviewing a request");
    }

    //ii. checking whether the rquestId is valid
    const connectionRequest= await ConnectionRequestModel.findOne({_id: requestId  ,toUserId: loggedInUser._id, status: "interested" })

    if(!connectionRequest){
        return res.status(404).send("Connection request not found or already processed");
    }

    // saving the user
    connectionRequest.status= status

   const data= await connectionRequest.save()

    res.json({
        message: loggedInUser.firstName + " has " + status + " the connection request from " + connectionRequest.fromUserId ,
        data
    })



  }catch(err){
    return res.status(400).send("Bad Request: " + err.message);
  }
})


module.exports=requestRouter



// // previous class 

// const express=require('express')
// const requestRouter= express.Router();
// const {userAuth}=require("../middlewares/auth")


// requestRouter.get("/user/connectionRequest",userAuth,async(req,res)=>{
//     const {firstName}=req.user
//     res.send(firstName + " has sent you a connection request")
// })

// module.exports=requestRouter



// // // $or: [
// // //   { fromUserId: fromUserId, toUserId: toUserId },
// // //   { fromUserId: toUserId, toUserId: fromUserId }
// // // ]



// // // 🔁 Visual Example
// // // Imagine:

// // // 🧑 User A has ID: 111

// // // 👩 User B has ID: 222
// // 
// // // Now the query:

// // // $or: [
// // //   { fromUserId: 111, toUserId: 222 }, // A → B
// // //   { fromUserId: 222, toUserId: 111 }  // B → A
// // // ]
// // // So if either of these requests already exists, the API blocks a new one.