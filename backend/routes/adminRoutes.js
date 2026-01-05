// routes/adminRoutes.js
//Working////////////////////

import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  getAllUsers,
  getAllListings,
  deleteUser,
  deleteListing,
  toggleAdmin,
  getUserProfile,
} from "../controllers/adminController.js";
import isAuth from "../middleware/isAuth.js";
import verifyAdmin from "../middleware/verifyAdmin.js";
import User from "../model/user.model.js";

const router = express.Router();

router.get("/users", isAuth, verifyAdmin, getAllUsers);
router.get("/users/:id/profile", isAuth, verifyAdmin, getUserProfile);
router.get("/listings", isAuth, verifyAdmin, getAllListings);
router.delete("/users/:id", isAuth, verifyAdmin, deleteUser);
router.patch("/users/:id/toggle-admin", isAuth, verifyAdmin, toggleAdmin);
router.delete("/listings/:id", isAuth, verifyAdmin, deleteListing);


router.get("/dashboard", isAuth, verifyAdmin, async (req, res) => {
  res.json({ message: "Welcome to Admin Dashboard" });
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Check admin
    if (!user.isAdmin) {
      return res.status(403).json({ message: "Not an admin" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    
    const token = jwt.sign(
      { userId: user._id, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Admin login successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
