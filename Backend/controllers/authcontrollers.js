const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const User=require("../models/User")
const {registerSchema, loginSchema}=require("../utils/validators/authValidator")
const dotenv=require("dotenv")
dotenv.config()
exports.register=async(req,res)=>{
    try{

        const parsed=registerSchema.safeParse(req.body)
        if(!parsed.success){
            return res.status(400).json({
                error: parsed.error.issues[0].message,
            })
        }

        const {email,password}=parsed.data

        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                error:"User already exists"
            })
        }
        const hashedPassword=await bcrypt.hash(password,3)
        const user =await User.create({
            email,
            password:hashedPassword
        })

        res.status(201).json({
            message:"User registered",
            userId: user._id
        })
    }
    catch(err){
        res.status(500).json({
            error:"Server Error"
        })
    }
}

exports.login=async (req,res)=>{
    try{
        const parsed=loginSchema.safeParse(req.body)
        if(!parsed.success){
            return res.status(400).json({
                error:parsed.error.issues[0].message
            })
        }
        const {email,password}=parsed.data

        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({
                erorr:"Invalid creds"
            })
        }
        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({
                error:"Invalid creds"
            })
        }

        const token=jwt.sign({
            userId:user._id
        },process.env.JWT_SECRET,{expiresIn:"7d"})
    
        res.json({
            message:"Login Successful",
            token
        })


    }catch(error){
        console.log(error);
        
        res.status(500).json({
            error:"Server Error"
        })
    }
}