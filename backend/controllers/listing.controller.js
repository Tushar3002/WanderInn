import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../model/user.model.js";



export const addListing = async(req,res)=>{
    try {
        let host=req.userId;
        let {title,description,rent,city,landmark,category} = req.body;
        let image1=await uploadOnCloudinary(res.files.image1[0].path)
        let image2=await uploadOnCloudinary(res.files.image2[0].path)
        let image3=await uploadOnCloudinary(res.files.image3[0].path)
        let listing = await listing.create({
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
        })
        res.status(201).json(listing)
        let user = await User.findByIdAndUpdate(host,{$push:{listing:listing._id}},{new:true})
        if(!user){
            res.status(404).json({message:"user not found"})
        }

        res.status(201).json(listing)
    } catch (error) {
        res.status(500).json({message:`AddListing Error ${error}`})
    }
}