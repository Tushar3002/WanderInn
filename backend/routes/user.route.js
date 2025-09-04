// routes/user.route.js
import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getCurrentUser, updateUserProfile } from "../controllers/user.controller.js";
import User from "../model/user.model.js";



let userRouter = express.Router();

userRouter.get("/currentuser", isAuth, getCurrentUser);

// NEW: update own profile
userRouter.put("/profile", isAuth, updateUserProfile);

// Existing: get enriched profile
userRouter.get("/profile", isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate("listing", "title city landmark rent image1 isBooked")
      .populate("booking", "listingId checkIn checkOut totalPrice status")
      .select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
});




export default userRouter;
