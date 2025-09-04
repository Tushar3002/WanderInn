// config/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

const uploadOnCloudinary = async (filepath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  if (!filepath) return null;

  // convert to absolute path (helps on Windows)
  const absPath = path.resolve(filepath);

  if (!fs.existsSync(absPath)) {
    const err = new Error(`Temp file not found before upload: ${absPath}`);
    console.error("cloudinary upload error:", err);
    throw err;
  }

  try {
    const uploadResult = await cloudinary.uploader.upload(absPath);
    // remove temp file after success
    try { if (fs.existsSync(absPath)) fs.unlinkSync(absPath); } catch (e) { /* log but don't crash */ }
    return uploadResult.secure_url;
  } catch (error) {
    // attempt to unlink (if exists), log, and rethrow for caller to handle
    try { if (fs.existsSync(absPath)) fs.unlinkSync(absPath); } catch (fsErr) { console.error("Failed to remove temp file after upload error:", fsErr); }
    console.error("cloudinary upload error:", error);
    throw error;
  }
};

export default uploadOnCloudinary;
