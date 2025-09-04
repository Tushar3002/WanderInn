import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import userRouter from "./routes/user.route.js";
import listingRouter from "./routes/listing.routes.js";
import bookingRouter from "./routes/booking.route.js";



dotenv.config();

const port = process.env.PORT || 8000;
const app = express();
import adminRoutes from "./routes/adminRoutes.js";



app.use(express.json());
app.use(cookieParser());
app.use(cors({  
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials:true
}))

app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listing", listingRouter);
app.use("/api/booking", bookingRouter);


const startServer = async () => {
  try {
    await connectDb(); // ✅ connect to DB first
    app.listen(port, () => {
      console.log(`✅ Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
  }
};

startServer();
