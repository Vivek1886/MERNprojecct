const express=require("express")
const mongoose=require("mongoose")
const app=express()
const {connectDB}=require("./config/db")
app.use(express.json());
const authRoutes=require("./routes/authRoutes")
const resumeRoutes=require("./routes/resumeRoutes")
const analysisRoutes=require("./routes/analysisRoutes")
connectDB()


app.use("/api/auth", authRoutes);
app.use("/api/resume",resumeRoutes)
app.use("/api/analysis",analysisRoutes)
app.listen(3000,()=>{
   console.log("running")
})