const User = require("../models/userSchema");

const validateEditProfileData=(data)=>{

    try{
        const updatedAllowedFields=["firstName","lastName","age","profileUrl","about","skills","gender"]

        const isUpdateAllowed=Object.keys(data).every((k)=>updatedAllowedFields.includes(k));

        if(!isUpdateAllowed){
            throw new Error("Invalid update fields");
        }  
        
        //  user= await User.constfindByIdAndUpdate({_id:userId},data,{runValidators:true})

        return isUpdateAllowed
    }
    catch(err){
       throw new Error(err.message)
    }


}

module.exports=validateEditProfileData