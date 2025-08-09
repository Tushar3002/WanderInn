import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../model/user.model.js";
import Listing from "../model/listing.model.js";


export const addListing = async (req, res) => {
  try {
    let host = req.userId;
    let { title, description, rent, city, landmark, category } = req.body;
    console.log("Request files: ", req.files);
    let image1 = await uploadOnCloudinary(req.files.image1[0].path);
    let image2 = await uploadOnCloudinary(req.files.image2[0].path);
    let image3 = await uploadOnCloudinary(req.files.image3[0].path);

    let listing = await Listing.create({
      title,
      description,
      rent,
      city,
      landmark,
      category,
      image1,
      image2,
      image3,
      host
    });

    let user = await User.findByIdAndUpdate(
      host,
      { $push: { listing: listing._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Only one response:
    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ message: `AddListing Error ${error.message}` });
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
            res.status(404).json({message:"listening not found "})
        }
        res.status(200).json(listing)
    } catch (error) {
        res.status().json(`findlistening error ${error}`)
    }
}

export const updateListing = async(req,res)=>{
  try {
    let image1;
    let image2;
    let image3;
    let {id} = req.params;
    let { title, description, rent, city, landmark, category } = req.body;
    console.log("Request files: ", req.files);
    if(req.files.image1) 
      {image1 = await uploadOnCloudinary(req.files.image1[0].path)}
    if(req.files.image2) {image2 = await uploadOnCloudinary(req.files.image2[0].path)}
    if(req.files.image3) {image3 = await uploadOnCloudinary(req.files.image3[0].path)}

    let listing = await Listing.findByIdAndUpdate(id,{
      title,
      description,
      rent,
      city,
      landmark,
      category,
      image1,
      image2,
      image3,
      
    },{new:true});

    

    // ✅ Only one response:
    return res.status(201).json(listing);
  
  } catch (error) {
    return res.status(500).json({message:`Update Listing Error ${error}`})
  }
}

export const deleteListing = async(req,res)=>{
  try {
    let {id} = req.params;
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