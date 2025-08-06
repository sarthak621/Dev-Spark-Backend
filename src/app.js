// class 11 express routers
const express= require('express')
const app=express()
const connectDb=require("./config/database")
const cookieParser= require('cookie-parser')
const cors=require('cors')

const authRouter=require("./routers/auth")
const profileRouter=require("./routers/profile")
const requestRouter=require("./routers/requests")
const userRouter=require("./routers/user")

app.use(express.json()) // to parse JSON data from request body
app.use(cookieParser()) // to parse cookies from request
// app.use(cors())     
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))        


app.use("/",authRouter) // using authRouter for all auth related routes
app.use("/",profileRouter) // using profileRouter for all profile related routes    
app.use("/",requestRouter) // using requestRouter for all request related routes
app.use("/",userRouter) // using userRouter for all user related routes
                 //start here

               //end here


connectDb().then(()=>{
    console.log("Database connected successfully")

    app.listen(4000,()=>{
    console.log("server running on port 4000")
})
}).catch((err)=>{
    console.log("Error connecting to database", err)
})






// // class 10->part 4 schema methods
// const express= require('express')
// const app=express()
// const connectDb=require("./config/database")
// const User= require("./models/userSchema")
// const bctrypt=require('bcrypt')
// const cookieParser= require('cookie-parser')
// const jwt = require('jsonwebtoken')
// const {userAuth}=require("./middlewares/auth")

// app.use(express.json()) // to parse JSON data from request body
// app.use(cookieParser()) // to parse cookies from request
         
//                  //start here
// app.post("/user/login",async(req,res)=>{
//     try{
//         const {email,password}=req.body

//         const user= await User.findOne({email:email})

//         //compare the passowrd
//         // const isPasswordValid=await bctrypt.compare(password,user.password)
//         const isPasswordValid=await user.passwordMatch(password)

//         if(!isPasswordValid){
//             throw new Error("Invalid credentials")
//         }
//         else{
//             //password is valid
            
//             //creating a jwt token 
//             // const token = await jwt.sign({_id:user._id},"NAMASTENODES2",{expiresIn:"1h"})
//             const token= await user.getJWT()   /// writing this in userSchema.js file
//             //this token will create the token
//             res.cookie("token",token)

//             res.send("user logged in successfully")
//         }

//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })


// app.get("/user/profile",userAuth,async(req,res)=>{
//     const user=req.user
//     res.send(user)

// })

// app.get("/user/connectionRequest",userAuth,async(req,res)=>{
//     const {firstName}=req.user
//     res.send(firstName + " has sent you a connection request")
// })
//                //end here

// app.post("/user",async(req,res)=>{
//     //creating a new instance of the user model
//     // const user=new User(req.body)
    
//     //saving the user
//     try{
//         const {firstName, lastName, age, email, password}=req.body
        
//         const passwordHash=await bctrypt.hash(password,10)

//         const user=new User({firstName, lastName, age, email, password:passwordHash})
//         await user.save()
//         res.send("user created successfully")
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })



// connectDb().then(()=>{
//     console.log("Database connected successfully")

//     app.listen(4000,()=>{
//     console.log("server running on port 4000")
// })
// }).catch((err)=>{
//     console.log("Error connecting to database", err)
// })




// // class 10->part 3 creating the user AUTH middleware 
// const express= require('express')
// const app=express()
// const connectDb=require("./config/database")
// const User= require("./models/userSchema")
// const bctrypt=require('bcrypt')
// const cookieParser= require('cookie-parser')
// const jwt = require('jsonwebtoken')
// const {userAuth}=require("./middlewares/auth")

// app.use(express.json()) // to parse JSON data from request body
// app.use(cookieParser()) // to parse cookies from request
         
//                  //start here
// app.post("/user/login",async(req,res)=>{
//     try{
//         const {email,password}=req.body

//         const user= await User.findOne({email:email})

//         //compare the passowrd
//         const isPasswordValid=await bctrypt.compare(password,user.password)

//         if(!isPasswordValid){
//             throw new Error("Invalid credentials")
//         }
//         else{
//             //password is valid
            
//             //creating a jwt token 
//             const token = await jwt.sign({_id:user._id},"NAMASTENODES2",{expiresIn:"1h"})
//             //this token will create the token
//             res.cookie("token",token)

//             res.send("user logged in successfully")
//         }

//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })


// app.get("/user/profile",userAuth,async(req,res)=>{
//     const user=req.user
//     res.send(user)

// })

// app.get("/user/connectionRequest",userAuth,async(req,res)=>{
//     const {firstName}=req.user
//     res.send(firstName + " has sent you a connection request")
// })
//                //end here

// app.post("/user",async(req,res)=>{
//     //creating a new instance of the user model
//     // const user=new User(req.body)
    
//     //saving the user
//     try{
//         const {firstName, lastName, age, email, password}=req.body
        
//         const passwordHash=await bctrypt.hash(password,10)

//         const user=new User({firstName, lastName, age, email, password:passwordHash})
//         await user.save()
//         res.send("user created successfully")
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })



// connectDb().then(()=>{
//     console.log("Database connected successfully")

//     app.listen(4000,()=>{
//     console.log("server running on port 4000")
// })
// }).catch((err)=>{
//     console.log("Error connecting to database", err)
// })







// // class 10->part 2 Authentication JWT and cookies 
// const express= require('express')
// const app=express()
// const connectDb=require("./config/database")
// const User= require("./models/userSchema")
// const bctrypt=require('bcrypt')
// const cookieParser= require('cookie-parser')
// const jwt = require('jsonwebtoken')

// app.use(express.json()) // to parse JSON data from request body
// app.use(cookieParser()) // to parse cookies from request
         
//                  //start here
// app.post("/user/login",async(req,res)=>{
//     try{
//         const {email,password}=req.body

//         const user= await User.findOne({email:email})

//         //compare the passowrd
//         const isPasswordValid=await bctrypt.compare(password,user.password)

//         if(!isPasswordValid){
//             throw new Error("Invalid credentials")
//         }
//         else{
//             //password is valid
            
//             //creating a jwt token 
//             const token = await jwt.sign({_id:user._id},"NAMASTENODES2")
//             //this token will create the token
//             res.cookie("token",token)

//             res.send("user logged in successfully")
//         }

//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })


// app.get("/user/profile",async(req,res)=>{
//     const cookie=req.cookies
//     // console.log(cookie)
//     // res.send("reading cookie")
     
//     //is cookie se token nikalna hai 
//     const {token}=cookie

//     //verify the token
//     try{
//         const decodedMsg=await jwt.verify(token,"NAMASTENODES2")

//         if(!decodedMsg){
//             throw new Error("Invalid token")
//         }
//         else{
//             //valid token
//             //find the user with id
//             const user=await User.findById({_id:decodedMsg._id})
            
//             if(!user){
//                 throw new Error("User not found")
//             }
//             else{
                
//                 res.send(user)
//             }
//         }
//     }

//        catch(err){
//         res.status(400).send(err.message)
//     }


// })
//                //end here

// app.post("/user",async(req,res)=>{
//     //creating a new instance of the user model
//     // const user=new User(req.body)
    
//     //saving the user
//     try{
//         const {firstName, lastName, age, email, password}=req.body
        
//         const passwordHash=await bctrypt.hash(password,10)

//         const user=new User({firstName, lastName, age, email, password:passwordHash})
//         await user.save()
//         res.send("user created successfully")
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })



// //to find the user with the email
// app.get("/user",async(req,res)=>{
//     const email=req.body.email
//     try{
//         const user= await User.find({email:email})
//         if(user.length===0){
//             res.status(400).send("user not found")
//         }
//         else{
//             res.send(user)
//         }
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })


// //to find all the users
// app.get("/feed",async(req,res)=>{
//     const email=req.body.email
//     try{
//         const user= await User.find({})
//         if(user.length===0){
//             res.status(400).send("user not found")
//         }
//         else{
//             res.send(user)
//         }
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })

// //findOne
// app.get("/userONE",async(req,res)=>{
//     const name=req.body.firstName
//     try{
//         const user= await User.findOne({firstName:name})
//         if(user.length===0){
//             res.status(400).send("user not found")
//         }
//         else{
//             res.send(user)
//         }
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })


// //delete user
// app.delete("/user",async(req,res)=>{
//     const id=req.body._id
//     try{
//         const user= await User.findByIdAndDelete({_id:id})
//         if(user.length===0){
//             res.status(400).send("user not found")
//         }
//         else{
//             res.send("user deleted successfully")
//         }
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })


// //update user
// app.patch("/user/",async(req,res)=>{
//     const id=req.body._id
//     const data=req.body
//     try{
//         const allowed_fields=["_id","lastName","skills","about","gender","skills"]

//         const isUpdateAllowed=Object.keys(data).every((k)=> allowed_fields.includes(k))
//         if(!isUpdateAllowed){
//             throw new Error("Invalid fields for update")
//         }

//         const user= await User.findByIdAndUpdate({_id:id},data,{runValidators:true})
//         if(user.length===0){
//             res.status(400).send("user not found")
//         }
//         else{
//             res.send("user updated successfully")
//         }
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })


// connectDb().then(()=>{
//     console.log("Database connected successfully")

//     app.listen(4000,()=>{
//     console.log("server running on port 4000")
// })
// }).catch((err)=>{
//     console.log("Error connecting to database", err)
// })





// // class 10 Authentication JWT and cookies 
// const express= require('express')
// const app=express()
// const connectDb=require("./config/database")
// const User= require("./models/userSchema")
// const bctrypt=require('bcrypt')
// const cookieParser= require('cookie-parser')

// app.use(express.json()) // to parse JSON data from request body
// app.use(cookieParser()) // to parse cookies from request
         
//                  //start here
// app.post("/user/login",async(req,res)=>{
//     try{
//         const {email,password}=req.body

//         const user= await User.findOne({email:email})

//         //compare the passowrd
//         const isPasswordValid=await bctrypt.compare(password,user.password)

//         if(!isPasswordValid){
//             throw new Error("Invalid credentials")
//         }
//         else{
//             //password is valid
            
//             res.cookie("token","7t3635737sgvffgyfhebc")

//             res.send("user logged in successfully")
//         }

//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })


// app.get("/user/profile",async(req,res)=>{
//     const cookie=req.cookies
//     console.log(cookie)
//     res.send("reading cookie")
// })
//                //end here

// app.post("/user",async(req,res)=>{
//     //creating a new instance of the user model
//     // const user=new User(req.body)
    
//     //saving the user
//     try{
//         const {firstName, lastName, age, email, password}=req.body
        
//         const passwordHash=await bctrypt.hash(password,10)

//         const user=new User({firstName, lastName, age, email, password:passwordHash})
//         await user.save()
//         res.send("user created successfully")
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })



// //to find the user with the email
// app.get("/user",async(req,res)=>{
//     const email=req.body.email
//     try{
//         const user= await User.find({email:email})
//         if(user.length===0){
//             res.status(400).send("user not found")
//         }
//         else{
//             res.send(user)
//         }
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })


// //to find all the users
// app.get("/feed",async(req,res)=>{
//     const email=req.body.email
//     try{
//         const user= await User.find({})
//         if(user.length===0){
//             res.status(400).send("user not found")
//         }
//         else{
//             res.send(user)
//         }
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })

// //findOne
// app.get("/userONE",async(req,res)=>{
//     const name=req.body.firstName
//     try{
//         const user= await User.findOne({firstName:name})
//         if(user.length===0){
//             res.status(400).send("user not found")
//         }
//         else{
//             res.send(user)
//         }
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })


// //delete user
// app.delete("/user",async(req,res)=>{
//     const id=req.body._id
//     try{
//         const user= await User.findByIdAndDelete({_id:id})
//         if(user.length===0){
//             res.status(400).send("user not found")
//         }
//         else{
//             res.send("user deleted successfully")
//         }
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })


// //update user
// app.patch("/user/",async(req,res)=>{
//     const id=req.body._id
//     const data=req.body
//     try{
//         const allowed_fields=["_id","lastName","skills","about","gender","skills"]

//         const isUpdateAllowed=Object.keys(data).every((k)=> allowed_fields.includes(k))
//         if(!isUpdateAllowed){
//             throw new Error("Invalid fields for update")
//         }

//         const user= await User.findByIdAndUpdate({_id:id},data,{runValidators:true})
//         if(user.length===0){
//             res.status(400).send("user not found")
//         }
//         else{
//             res.send("user updated successfully")
//         }
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })


// connectDb().then(()=>{
//     console.log("Database connected successfully")

//     app.listen(4000,()=>{
//     console.log("server running on port 4000")
// })
// }).catch((err)=>{
//     console.log("Error connecting to database", err)
// })









// // class 9 Encryption and Decryption of Passwords 
// const express= require('express')
// const app=express()
// const connectDb=require("./config/database")
// const User= require("./models/userSchema")
// const bctrypt=require('bcrypt')

// app.use(express.json()) // to parse JSON data from request body

// app.post("/user/login",async(req,res)=>{
//     try{
//         const {email,password}=req.body

//         const user= await User.findOne({email:email})

//         //compare the passowrd
//         const isPasswordValid=await bctrypt.compare(password,user.password)

//         if(!isPasswordValid){
//             throw new Error("Invalid credentials")
//         }
//         else{
//             res.send("user logged in successfully")
//         }

//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })

// app.post("/user",async(req,res)=>{
//     //creating a new instance of the user model
//     // const user=new User(req.body)
    
//     //saving the user
//     try{
//         const {firstName, lastName, age, email, password}=req.body
        
//         const passwordHash=await bctrypt.hash(password,10)

//         const user=new User({firstName, lastName, age, email, password:passwordHash})
//         await user.save()
//         res.send("user created successfully")
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })



// //to find the user with the email
// app.get("/user",async(req,res)=>{
//     const email=req.body.email
//     try{
//         const user= await User.find({email:email})
//         if(user.length===0){
//             res.status(400).send("user not found")
//         }
//         else{
//             res.send(user)
//         }
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })


// //to find all the users
// app.get("/feed",async(req,res)=>{
//     const email=req.body.email
//     try{
//         const user= await User.find({})
//         if(user.length===0){
//             res.status(400).send("user not found")
//         }
//         else{
//             res.send(user)
//         }
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })

// //findOne
// app.get("/userONE",async(req,res)=>{
//     const name=req.body.firstName
//     try{
//         const user= await User.findOne({firstName:name})
//         if(user.length===0){
//             res.status(400).send("user not found")
//         }
//         else{
//             res.send(user)
//         }
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })


// //delete user
// app.delete("/user",async(req,res)=>{
//     const id=req.body._id
//     try{
//         const user= await User.findByIdAndDelete({_id:id})
//         if(user.length===0){
//             res.status(400).send("user not found")
//         }
//         else{
//             res.send("user deleted successfully")
//         }
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })


// //update user
// app.patch("/user/",async(req,res)=>{
//     const id=req.body._id
//     const data=req.body
//     try{
//         const allowed_fields=["_id","lastName","skills","about","gender","skills"]

//         const isUpdateAllowed=Object.keys(data).every((k)=> allowed_fields.includes(k))
//         if(!isUpdateAllowed){
//             throw new Error("Invalid fields for update")
//         }

//         const user= await User.findByIdAndUpdate({_id:id},data,{runValidators:true})
//         if(user.length===0){
//             res.status(400).send("user not found")
//         }
//         else{
//             res.send("user updated successfully")
//         }
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })


// connectDb().then(()=>{
//     console.log("Database connected successfully")

//     app.listen(4000,()=>{
//     console.log("server running on port 4000")
// })
// }).catch((err)=>{
//     console.log("Error connecting to database", err)
// })






// // class 8 API LEVEL VALIDATION 
// const express= require('express')
// const app=express()
// const connectDb=require("./config/database")
// const User= require("./models/userSchema")

// app.use(express.json()) // to parse JSON data from request body

// app.post("/user",async(req,res)=>{
//     //creating a new instance of the user model
//     const user=new User(req.body)

//     //saving the user
//     try{
//         await user.save()
//         res.send("user created successfully")
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })

// //to find the user with the email
// app.get("/user",async(req,res)=>{
//     const email=req.body.email
//     try{
//         const user= await User.find({email:email})
//         if(user.length===0){
//             res.status(400).send("user not found")
//         }
//         else{
//             res.send(user)
//         }
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })


// //to find all the users
// app.get("/feed",async(req,res)=>{
//     const email=req.body.email
//     try{
//         const user= await User.find({})
//         if(user.length===0){
//             res.status(400).send("user not found")
//         }
//         else{
//             res.send(user)
//         }
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })

// //findOne
// app.get("/userONE",async(req,res)=>{
//     const name=req.body.firstName
//     try{
//         const user= await User.findOne({firstName:name})
//         if(user.length===0){
//             res.status(400).send("user not found")
//         }
//         else{
//             res.send(user)
//         }
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })


// //delete user
// app.delete("/user",async(req,res)=>{
//     const id=req.body._id
//     try{
//         const user= await User.findByIdAndDelete({_id:id})
//         if(user.length===0){
//             res.status(400).send("user not found")
//         }
//         else{
//             res.send("user deleted successfully")
//         }
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })


// //update user
// app.patch("/user/",async(req,res)=>{
//     const id=req.body._id
//     const data=req.body
//     try{
//         const allowed_fields=["_id","lastName","skills","about","gender","skills"]

//         const isUpdateAllowed=Object.keys(data).every((k)=> allowed_fields.includes(k))
//         if(!isUpdateAllowed){
//             throw new Error("Invalid fields for update")
//         }

//         const user= await User.findByIdAndUpdate({_id:id},data,{runValidators:true})
//         if(user.length===0){
//             res.status(400).send("user not found")
//         }
//         else{
//             res.send("user updated successfully")
//         }
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })


// connectDb().then(()=>{
//     console.log("Database connected successfully")

//     app.listen(4000,()=>{
//     console.log("server running on port 4000")
// })
// }).catch((err)=>{
//     console.log("Error connecting to database", err)
// })




// // class 7 how to add dynamic data 
// const express= require('express')
// const app=express()
// const connectDb=require("./config/database")
// const User= require("./models/userSchema")

// app.use(express.json()) // to parse JSON data from request body

// app.post("/user",async(req,res)=>{
//     //creating a new instance of the user model
//     const user=new User(req.body)

//     //saving the user
//     try{
//         await user.save()
//         res.send("user created successfully")
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })

// //to find the user with the email
// app.get("/user",async(req,res)=>{
//     const email=req.body.email
//     try{
//         const user= await User.find({email:email})
//         if(user.length===0){
//             res.status(400).send("user not found")
//         }
//         else{
//             res.send(user)
//         }
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })


// //to find all the users
// app.get("/feed",async(req,res)=>{
//     const email=req.body.email
//     try{
//         const user= await User.find({})
//         if(user.length===0){
//             res.status(400).send("user not found")
//         }
//         else{
//             res.send(user)
//         }
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })

// //findOne
// app.get("/userONE",async(req,res)=>{
//     const name=req.body.firstName
//     try{
//         const user= await User.findOne({firstName:name})
//         if(user.length===0){
//             res.status(400).send("user not found")
//         }
//         else{
//             res.send(user)
//         }
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })


// //delete user
// app.delete("/user",async(req,res)=>{
//     const id=req.body._id
//     try{
//         const user= await User.findByIdAndDelete({_id:id})
//         if(user.length===0){
//             res.status(400).send("user not found")
//         }
//         else{
//             res.send("user deleted successfully")
//         }
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })


// //update user
// app.patch("/user",async(req,res)=>{
//     const id=req.body._id
//     const data=req.body
//     try{
//         const user= await User.findByIdAndUpdate({_id:id},data,{runValidators:true})
//         if(user.length===0){
//             res.status(400).send("user not found")
//         }
//         else{
//             res.send("user updated successfully")
//         }
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })


// connectDb().then(()=>{
//     console.log("Database connected successfully")

//     app.listen(4000,()=>{
//     console.log("server running on port 4000")
// })
// }).catch((err)=>{
//     console.log("Error connecting to database", err)
// })





// // class 6 posting data to the API
// const express= require('express')
// const app=express()
// const connectDb=require("./config/database")
// const User= require("./models/userSchema")

// app.post("/user",async(req,res)=>{
//     //creating a new instance of the user model
//     const user=new User({
//         firstName:"Sarthak",
//         lastName:"Srivastav",
//         age:22,
//         email:"sarthak@sri.com",
//         password:"Sarthak@123"
//     })

//     //saving the user
//     try{
//         await user.save()
//         res.send("user created successfully")
//     }
//     catch(err){
//         res.status(400).send(err.message)
//     }
// })


// connectDb().then(()=>{
//     console.log("Database connected successfully")

//     app.listen(4000,()=>{
//     console.log("server running on port 4000")
// })
// }).catch((err)=>{
//     console.log("Error connecting to database", err)
// })




// // class 6 database connection... good way
// const express= require('express')
// const app=express()
// const connectDb=require("./config/database")

// connectDb().then(()=>{
//     console.log("Database connected successfully")

//     app.listen(4000,()=>{
//     console.log("server running on port 4000")
// })
// }).catch((err)=>{
//     console.log("Error connecting to database", err)
// })




// // class 6 database connection {bad practice} -> good practice is that first connect the database and then call app.listen  
// const express= require('express')
// const app=express()
// require("./config/database")

// app.listen(4000,()=>{
//     console.log("server running on port 4000")
// })







// // class 5 using middlewares in the auth to looks code cleaner

// const express= require('express')
// const app=express()
// const {adminAuth,userAuth}=require("./middlewares/auth.js")

// //to authorize the admin
// app.use("/admin",adminAuth)

// app.use("/user/login",(req,res)=>{
//     res.send("user logged in")
// })

// app.use("/user",userAuth,(req,res)=>{
//     res.send("user authenticated")
// })

// app.use("/admin/getAllData",(req,res)=>{
//     res.send("Data fetched")
// })


// app.use("/admin/deleteData",(req,res)=>{
//     res.send("data deleted")
// })

// app.listen(3000,()=>{
//     console.log("server running on port 3000")
// })



// // class 5 middleware and why we need it

// const express= require('express')
// const app=express()

// //to authorize the admin
// app.use("/admin",(req,res,next)=>{
//     const token="xyz";
    
//     const isAdminAuthorized= token==="xyz"

//     if(isAdminAuthorized){
//         next();
//     }
//     else{
//         res.status(401).send("unauthorized access")
//     }
// })

// app.use("/admin/getAllData",(req,res)=>{
//     res.send("Data fetched")
// })


// app.use("/admin/deleteData",(req,res)=>{
//     res.send("data deleted")
// })

// app.listen(3000,()=>{
//     console.log("server running on port 3000")
// })



// // class 5 handling route loop
// const express= require('express');
// const app=express();

// app.use("/demo",(req,res,next)=>{
//     // res.send("this is demo route")
//     next()
// }, (req,res)=>{
//     res.send("this is second middleware for demo route")
// })

// app.listen(3000,()=>{
//     console.log("server running on port 3000")
// })


// //class 1-4
// const express= require('express')
// const app=express()


// app.get("/user/:userid/:password",(req,res)=>{
//     console.log(req.params)
//     res.send({name:"sarthak",age:22,city:"delhi"})
// })

// app.post("/user",(req,res)=>{
//     res.send("user data posted successfully")
// })

// app.delete("/user",(req,res)=>{
//     res.send("user data deleted successfully")
// })


// app.use("/test",(req,res)=>{
//     res.send("hello world")
// })

// app.get("/demo",(req,res)=>{
//     res.send("this is only for demo purpose")
// })

// app.use("/",(req,res)=>{
//     res.send("this is home")
// })
// app.listen(3000,()=>{
//     console.log("Server is running on port 3000")
// })
