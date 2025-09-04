import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../Context/UserContext";
import { listingDataContext } from "../Context/ListingContext";
import { FaStar } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { FcCancel } from "react-icons/fc";
import { bookingDataContext } from "../Context/BookingContext";

function Card({
  title,
  landmark,
  image1,
  image2,
  image3,
  rent,
  city,
  id,
  ratings,
  isBooked,
  host,
  bookingId, // optional: when provided, enables cancel for guest using booking id
}) {
  let navigate = useNavigate();
  let { userData } = useContext(userDataContext);
  let { handleViewCard } = useContext(listingDataContext);
  let { cancelBooking, resetBookingForm } = useContext(bookingDataContext);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleClick = () => {
    // Let everyone open the view page; booking is gated there
    handleViewCard(id);
    // Reset booking form when viewing a different property
    resetBookingForm();
  };

  const handleCancelBooking = (e) => {
    e.stopPropagation(); // Prevent card click
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      // For guests: use bookingId, for hosts: use listing id
      const cancelId = bookingId || id;
      console.log(
        "Cancelling booking with ID:",
        cancelId,
        "Type:",
        typeof cancelId
      );
      cancelBooking(cancelId);
    }
  };

  return (
    <div
      className="w-full bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer relative"
      onClick={handleClick}
    >
      {isBooked && (
        <div
          className="text-[green] bg-white rounded-lg absolute flex items-center justify-center right-1
          top-1 gap-[5px] p-[5px]"
        >
          <GiConfirmed className="w-[20px] h-[20px] text-[green]" />
          Booked
        </div>
      )}

      {/* Cancel Booking Button - Only show for hosts or guests with booking */}
      {isBooked && (host == userData?._id || Boolean(bookingId)) && (
        <button
          className="absolute left-1 top-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg 
          text-sm font-medium transition-colors duration-200 flex items-center gap-1 z-10"
          onClick={handleCancelBooking}
        >
          <FcCancel className="w-[16px] h-[16px]" />
          Cancel
        </button>
      )}

      <div className="w-full h-[220px] overflow-hidden bg-gray-200">
        {!imgLoaded && (
          <div className="w-full h-full animate-pulse bg-gray-200" />
        )}
        <img
          src={image1}
          alt=""
          className={`w-full h-full object-cover ${
            imgLoaded ? "block" : "hidden"
          }`}
          onLoad={() => setImgLoaded(true)}
        />
      </div>
      <div className="p-3 flex flex-col gap-1">
        <div className="flex items-center justify-between text-[16px]">
          <span className="w-[80%] truncate font-semibold text-[#1f2937]">
            In {landmark.toUpperCase()},{city.toUpperCase()}
          </span>
          <span className="flex items-center justify-center gap-[5px] text-[14px] text-gray-700">
            <FaStar />
            {ratings}
          </span>
        </div>
        <span className="w-[80%] truncate text-[14px] text-gray-700">
          {title.toUpperCase()}
        </span>
        <span className="text-[15px] font-semibold text-[#ef4444]">
          ₹ {rent} /day
        </span>
      </div>
    </div>
  );
}

export default Card;
