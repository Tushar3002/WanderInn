import multer from 'multer';

let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public")
    },
    filename:(req,file,cb)=>{
        cd(null,file.originalname)
    }
})

const upload=multer({storage})

export default upload