//class 10 creating the authentication middleware
const jwt=require('jsonwebtoken')
const User=require('../models/userSchema')

const userAuth=async(req,res,next)=>{
    const {token}=req.cookies
    if(!token){
         return res.status(401).send("Unauthorized access: No token provided");
    }

    try{
        const decodedMsg=await jwt.verify(token,"NAMASTENODES2")
        if(!decodedMsg){
               return res.status(401).send("Unauthorized access: Invalid token");
        }

        const user=await User.findById({_id:decodedMsg._id})
        if(!user){
           return res.status(401).send("Unauthorized access: User not found");
        }
        else{
            req.user=user
            next()
        }
    }
    catch(err){
        res.status(400).send("Bad Request: " + err.message);
    }
}

module.exports={
    userAuth}



//previous class
// const adminAuth=(req,res,next)=>{
//     const token="xyz";
    
//     const isAdminAuthorized= token==="xyz"

//     if(isAdminAuthorized){
//         next();
//     }
//     else{
//         res.status(401).send("unauthorized access")
//     }
// }

// const userAuth=(req,res,next)=>{
//     const token="xyz";
    
//     const isAdminAuthorized= token==="xyz"

//     if(isAdminAuthorized){
//         next();
//     }
//     else{
//         res.status(401).send("unauthorized access")
//     }
// }

// module.exports={
//     adminAuth, userAuth
// }