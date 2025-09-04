import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../model/user.model.js";

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ Connected to database");

    // Replace 'user@example.com' with the email of the user you want to make admin
    const userEmail = "user@example.com"; // 👈 Change this to your user's email
    
    const user = await User.findOne({ email: userEmail });
    
    if (!user) {
      console.log("❌ User not found with email:", userEmail);
      return;
    }

    // Update user to be admin
    user.isAdmin = true;
    await user.save();
    
    console.log("✅ User updated to admin:", userEmail);
    console.log("User details:", {
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("✅ Disconnected from database");
  }
};

createAdmin();
