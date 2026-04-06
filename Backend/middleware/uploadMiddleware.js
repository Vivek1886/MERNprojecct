const multer=require("multer");
const path=require("path");


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/");
    },
    filename:(req,file,cb)=>{
        const uniqueName=Date.now()+path.extname(file.originalname);
        cb(null,uniqueName);
    },
}
)

const allowedTypes = ["application/pdf"];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files allowed"), false);
  }
};



const upload=multer({storage,fileFilter,limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },})


module.exports = upload;