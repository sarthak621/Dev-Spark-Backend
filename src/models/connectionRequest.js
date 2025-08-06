// class 12 

const mongoose= require('mongoose');
const User = require('./userSchema'); 

const connectionRequestSchema= new mongoose.Schema({

    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to User model
        // This is optional, but it helps in populating the user data later
        required: true,

    },

    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      
    },

    status:{
        type:String,
        required: true,
        enum:{
           values:["ignored","interested","accepted","rejected"],
           message: "{VALUE} is not a valid status"
        }
    }

},
{
    timestamps:true
})

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  // Check if the fromUserId is same as toUserId
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send connection request to yourself!");
  }
  next();
});

const ConnectionRequestModel= new mongoose.model("ConnectionRequestModel",connectionRequestSchema)

module.exports=ConnectionRequestModel