import Booking from "../model/booking.model.js"
import Listing from "../model/listing.model.js"
import User from "../model/user.model.js"

export const createBooking=async(req,res)=>{
    try {
        let {id}=req.params
        let {checkIn,checkOut,totalRent}=req.body

        let listing = await Listing.findById(id)
        if(!listing){
            return res.status(404).json({message:"Listing not Found"})
        }
        if(new Date(checkIn)>= new Date(checkOut)){
            return res.status(400).json({message:"Invalid Checkin Checkout Date"})
        }
        if(listing.isBooked){
            return res.status(400).json({message:"Listing is already booked"})
        }
        // prevent host booking own listing
        if (String(listing.host) === String(req.userId)) {
            return res.status(403).json({message: "You cannot book your own listing"});
        }
        let booking=await Booking.create({
            checkIn,
            checkOut,
            totalRent,
            host:listing.host,
            guest:req.userId,
            listing:listing._id
        })
        await booking.populate("host","email")
        let user = await User.findByIdAndUpdate(req.userId,{$push:{booking:booking._id}},{new:true})
        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }
        listing.guest=req.userId
        listing.isBooked=true
        await listing.save()
        return res.status(201).json(booking)

    } catch (error) {
        return res.status(500).json({message:`booking error : ${error}`})
    }
}

export const getBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id)
            .populate("listing")
            .populate("host", "email name")
            .populate("guest", "email name");
            
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        
        return res.status(200).json(booking);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching booking" });
    }
};

export const cancelBooking= async(req,res)=>{
    try {
        let {id}=req.params
        const booking = await Booking.findById(id).populate("listing");
        if(!booking){
            return res.status(404).json({message:"Booking not found"})
        }
        const listing = await Listing.findByIdAndUpdate(booking.listing, { isBooked:false, guest:null }, { new:true });
        let user = await User.findByIdAndUpdate(booking.guest,{
            $pull:{booking:booking._id}
        },{new:true})
        if(!user){
            return res.status(404).json({message:"user is not found"})
        }
        booking.status = "cancel";
        await booking.save();
        return res.status(200).json({message:"Booking Cancelled"})
    } catch (error) {
        return res.status(500).json({message:"Booking cancel error"})
    }
}

// Cancel booking by listing id (useful when client only has listing id)
export const cancelBookingByListing = async (req, res) => {
    try {
        const { listingId } = req.params;
        const booking = await Booking.findOne({ listing: listingId, status: "booked" }).populate("listing");
        if (!booking) {
            return res.status(404).json({ message: "Active booking for listing not found" });
        }
        await Listing.findByIdAndUpdate(listingId, { isBooked: false, guest: null }, { new: true });
        await User.findByIdAndUpdate(booking.guest, { $pull: { booking: booking._id } }, { new: true });
        booking.status = "cancel";
        await booking.save();
        return res.status(200).json({ message: "Booking Cancelled" });
    } catch (error) {
        return res.status(500).json({ message: "Booking cancel by listing error" });
    }
};