import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../model/user.model.js";
import Listing from "../model/listing.model.js";
import path from "path";


// controllers/listing.controller.js (addListing)
// controllers/listing.controller.js (snippet)


export const addListing = async (req, res) => {
  try {
    const host = req.userId;
    const { title, description, rent, city, landmark, category } = req.body;

    if (!req.files) return res.status(400).json({ message: "No files provided" });

    // Prepare upload promises for only existing fields
    const keys = ["image1", "image2", "image3"];
    const uploadPromises = keys.map((k) => {
      if (req.files[k] && req.files[k][0]) {
        const p = path.resolve(req.files[k][0].path);
        return uploadOnCloudinary(p);
      }
      return Promise.resolve(null);
    });

    const [image1, image2, image3] = await Promise.all(uploadPromises);

    const listing = await Listing.create({
      title, description, rent, city, landmark, category,
      image1, image2, image3, host
    });

    const user = await User.findByIdAndUpdate(host, { $push: { listing: listing._id } }, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(201).json(listing);
  } catch (error) {
    console.error("addListing error:", error);
    return res.status(500).json({ message: `AddListing Error ${error.message}` });
  }
};





export const getListing = async(req,res)=>{
    try {
        let listing = await Listing.find().sort({createdAt:-1})
        res.status(200).json(listing)
    } catch (error) {
        res.status(500).json({message:`get listing error ${error}`})
    }
}

export const findListing = async(req,res)=>{
    try {
        let {id}=req.params
        let listing= await Listing.findById(id)
        if(!listing){
            return res.status(404).json({message:"listing not found"})
        }
        return res.status(200).json(listing)
    } catch (error) {
        return res.status(500).json({message:`findListing error ${error}`})
    }
}

export const updateListing = async(req,res)=>{
  try {
    // Ensure only the host can update
    const existing = await Listing.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({message: "Listing not found"});
    }
    if (String(existing.host) !== String(req.userId)) {
      return res.status(403).json({message: "You are not allowed to update this listing"});
    }
    let image1;
    let image2;
    let image3;
    let {id} = req.params;
    let { title, description, rent, city, landmark, category } = req.body;
    if(req.files && req.files.image1) { image1 = await uploadOnCloudinary(req.files.image1[0].path) }
    if(req.files && req.files.image2) { image2 = await uploadOnCloudinary(req.files.image2[0].path) }
    if(req.files && req.files.image3) { image3 = await uploadOnCloudinary(req.files.image3[0].path) }

    const update = { title, description, rent, city, landmark, category };
    if (image1) update.image1 = image1;
    if (image2) update.image2 = image2;
    if (image3) update.image3 = image3;

    let listing = await Listing.findByIdAndUpdate(id, update, { new:true });

    

    // ✅ Only one response:
    return res.status(200).json(listing);
  
  } catch (error) {
    return res.status(500).json({message:`Update Listing Error ${error}`})
  }
}

export const deleteListing = async(req,res)=>{
  try {
    let {id} = req.params;
    const listingDoc = await Listing.findById(id);
    if (!listingDoc) {
      return res.status(404).json({message: "Listing not found"});
    }
    if (String(listingDoc.host) !== String(req.userId)) {
      return res.status(403).json({message: "You are not allowed to delete this listing"});
    }
    let listing=await Listing.findByIdAndDelete(id)
    let user=await User.findByIdAndUpdate(listing.host,{
      $pull:{listing:listing._id}
    },{new:true})
    if(!user){
      return res.status(404).json({message:"user not found"})
    }
    return res.status(201).json({message:"Listing Deleted"})
  } catch (error) {
    return res.status(201).json({message:`DeleteListing Error ${error}`})
  }
}

export const ratingListing= async(req,res)=>{
  try {
    let {id}=req.params;
    let {ratings}=req.body;
    
    // Validate rating input
    if (!ratings || ratings < 1 || ratings > 5) {
      return res.status(400).json({message:"Rating must be between 1 and 5"});
    }
    
    let listing= await Listing.findById(id);
    if(!listing){
      return res.status(404).json({message:"Listing not found"});
    }
    
    listing.ratings = Number(ratings);
    await listing.save();
    
    return res.status(200).json({ratings:listing.ratings, message: "Rating updated successfully"});
  } catch (error) {
    return res.status(500).json({message:`Rating Error: ${error}`});
  }
}

export const search = async (req, res) => {
  try {
    const { query } = req.query;

    // ✅ If query is empty, just return an empty array (or 200 with all listings if you prefer)
    if (!query || !query.trim()) {
      return res.status(200).json([]);
    }

    const listing = await Listing.find({
      $or: [
        { landmark: { $regex: query, $options: "i" } },
        { city: { $regex: query, $options: "i" } },
        { title: { $regex: query, $options: "i" } },
      ],
    });

    return res.status(200).json(listing);
  } catch (error) {
    console.log("search Error : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
