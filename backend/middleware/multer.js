// middleware/multer.js
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // absolute path to backend/public
    cb(null, path.resolve("public"));
  },
  filename: (req, file, cb) => {
    // remove spaces and prefix with timestamp to avoid collisions
    const safeName = file.originalname.replace(/\s+/g, "_");
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({ storage });

export default upload;
