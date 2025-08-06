const mongoose= require('mongoose')

const connectDb=async()=>{
    await mongoose.connect("mongodb+srv://srivastavsarthak6211:UwF3BsmknI21Yj9c@cluster0.yhbjqsn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/namateNodeS2")
}

module.exports=connectDb;

// connectDb().then(()=>{
//     console.log("Database connected successfully")
// }).catch((err)=>{
//     console.log("Error connecting to database", err)
// })