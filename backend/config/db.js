import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const mongoUrl = process.env.MONGODB_URL;
    if (!mongoUrl) {
      throw new Error("MONGODB_URL is not set. Add it to backend/.env");
    }

    await mongoose.connect(mongoUrl);
    console.log("Db connected");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    // Re-throw so server startup halts instead of running with a broken DB
    throw error;
  }
};

export default connectDb