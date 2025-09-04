import User from "../model/user.model.js"
// controllers/user.controller.js
import bcrypt from "bcrypt";


export const getCurrentUser = async(req,res)=>{
    try {
        let user = await User.findById(req.userId).select("-password")
        .populate("listing","title image1 image2 image3 description rent category city landmark isBooked host ratings")
        .populate({
            path: "booking",
            populate: {
                path: "listing",
                select: "title image1 image2 image3 description rent category city landmark isBooked host ratings"
            }
        })
        if(!user){
            res.status(400).json({message:"user doesn't found"})
        }
        res.status(200).json(user)
        
    } catch (error) {
        res.status(500).json({message: `getCurrentUser error ${error} `})
    }
}

// controllers/user.controller.js


export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId; // from isAuth
    const { name, email, password } = req.body;

    const update = {};

    if (name && name.trim()) update.name = name.trim();

    if (email && email.trim()) {
      const normalized = email.trim().toLowerCase();
      // if email changed, ensure not taken by someone else
      const exists = await User.findOne({ email: normalized, _id: { $ne: userId } });
      if (exists) return res.status(400).json({ message: "Email already in use" });
      update.email = normalized;
    }

    if (typeof password === "string" && password.length > 0) {
      if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
      }
      update.password = await bcrypt.hash(password, 10);
    }

    const updated = await User.findByIdAndUpdate(
      userId,
      { $set: update },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updated) return res.status(404).json({ message: "User not found" });
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: `Update profile error: ${err.message}` });
  }
};
