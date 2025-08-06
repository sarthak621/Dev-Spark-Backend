//class 10 schema methods
const mongoose= require('mongoose')
const validator=require('validator')
const jwt=require('jsonwebtoken')
const bctrypt=require('bcrypt')
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50
    },
    lastName:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:18
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
          if(!validator.isEmail(value)){
            throw new Error("Email is not Valid")
          }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
          if(!validator.isStrongPassword(value)){
            throw new Error("Password is not Valid")
          }
        }
    },

    gender:{
        type:String,
        validate(value){
            if(!["male","female"].includes(value)){
                throw new Error("Gender is not Valid")
            }
        }
    },

    about:{
        type:String,
        default: "this is a default about me section"
    },

    skills:{
        type:[String]
    },

    profileUrl:{
        type:String,
        default: "https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png"
    }
}
,{
    timestamps:true
}
)

//const token = await jwt.sign({_id:user._id},"NAMASTENODES2",{expiresIn:"1h"})

userSchema.methods.getJWT = async function(){
    const user=this

    const token=await jwt.sign({_id:user._id},"NAMASTENODES2",{expiresIn:"1h"})

    return token
}


// const isPasswordValid=await bctrypt.compare(password,user.password)

userSchema.methods.passwordMatch= async function(passwordEnteredByUser){
    const user=this
    const isPasswordValid=await bctrypt.compare(passwordEnteredByUser,user.password)

    return isPasswordValid
    
}


module.exports=mongoose.model("User",userSchema)



// //class 8 database validation
// const mongoose= require('mongoose')
// const validator=require('validator')

// const userSchema=new mongoose.Schema({
//     firstName:{
//         type:String,
//         required:true,
//         minLength:3,
//         maxLength:50
//     },
//     lastName:{
//         type:String,
//         required:true
//     },
//     age:{
//         type:Number,
//         min:18
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true,
//         lowercase:true,
//         trim:true,
//         validate(value){
//           if(!validator.isEmail(value)){
//             throw new Error("Email is not Valid")
//           }
//         }
//     },
//     password:{
//         type:String,
//         required:true,
//         validate(value){
//           if(!validator.isStrongPassword(value)){
//             throw new Error("Password is not Valid")
//           }
//         }
//     },

//     gender:{
//         type:String,
//         validate(value){
//             if(!["male","female"].includes(value)){
//                 throw new Error("Gender is not Valid")
//             }
//         }
//     },

//     about:{
//         type:String,
//         default: "this is a default about me section"
//     },

//     skills:{
//         type:[String]
//     }
// }
// ,{
//     timestamps:true
// }
// )

// module.exports=mongoose.model("User",userSchema)




// const mongoose= require('mongoose')

// const userSchema=new mongoose.Schema({
//     firstName:{
//         type:String,
//         required:true
//     },
//     lastName:{
//         type:String,
//         required:true
//     },
//     age:{
//         type:Number
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     password:{
//         type:String
//     }

// })

// module.exports=mongoose.model("User",userSchema)