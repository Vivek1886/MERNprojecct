const dotenv=require("dotenv")
const mongoose=require("mongoose")
dotenv.config()

exports.connectDB=async ()=> {
    await mongoose.connect(process.env.DB_CONNECTION_URL).then(()=>{
    console.log("DB runnig");
    
}).catch((error)=>{
    console.log("Error in db",error)
})
}

