import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config();

const port = process.env.PORT || 6000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({  
  origin:"http://localhost:5173",
  credentials:true
}))


app.use("/api/auth", authRouter);

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
