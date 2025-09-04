// controllers/adminController.js
//Working////////////////////

import User from "../model/user.model.js";
import Listing from "../model/listing.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching listings" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

export const deleteListing = async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.json({ message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting listing" });
  }
};

export const toggleAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Toggle admin status
    user.isAdmin = !user.isAdmin;
    await user.save();

    res.json({ 
      message: `User ${user.isAdmin ? 'made admin' : 'removed admin'} successfully`,
      isAdmin: user.isAdmin 
    });
  } catch (error) {
    res.status(500).json({ message: "Error toggling admin status" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id)
      .populate('listing', 'title city landmark rent image1 isBooked')
      .populate('booking', 'listingId checkIn checkOut totalPrice status')
      .select('-password'); // Exclude password from response
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
};
