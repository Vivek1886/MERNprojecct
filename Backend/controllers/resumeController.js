const Resume=require("../models/Resume");

const {extractTextFromPDF}=require("../utils/parser");

exports.uploadResume=async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({
                error:"File not found"
            })

        }
        const filePath=req.file.path;
        console.log("1 file received");

const text = await extractTextFromPDF(filePath);

console.log("2 parsed");
        const resume=await Resume.create({
            userId:req.user.userId,
            filePath,
            extractedText:text,
        })
        res.status(200).json({
            message:"Successful",
            
            resumeId: resume._id,
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error:"Failed to process"
        })
        

    }
}