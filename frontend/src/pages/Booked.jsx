import React, { useContext, useEffect, useState } from "react";
import { GiConfirmed } from "react-icons/gi";
import { bookingDataContext } from "../Context/BookingContext";
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Star from "../Component/Star";
import axios from "axios";
import { userDataContext } from "../Context/UserContext";
import { listingDataContext } from "../Context/ListingContext";
import { authDataContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

function Booked() {
  let { bookingData } = useContext(bookingDataContext);
  const [bookingDoc, setBookingDoc] = useState(bookingData || null);
  let [star, setStar] = useState(null);
  let navigate = useNavigate();
  let { bookingId } = useParams();
  let { getCurrentUser } = useContext(userDataContext);
  let { getListing } = useContext(listingDataContext);
  let { cardDetails } = useContext(listingDataContext);
  let { serverUrl } = useContext(authDataContext);

  // Fallback: fetch booking by id if opened directly or after refresh
  useEffect(() => {
    const fetchIfNeeded = async () => {
      if (!bookingDoc && bookingId) {
        try {
          const res = await axios.get(`${serverUrl}/api/booking/${bookingId}`, {
            withCredentials: true,
          });
          // hydrate contexts used on this page
          await getListing();
          await getCurrentUser();
          setBookingDoc(res.data);
        } catch (err) {
          toast.error(err.response?.data?.message || "Failed to load booking");
          navigate("/");
        }
      }
    };
    fetchIfNeeded();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingId]);

  const handleRating = async (id) => {
    if (!star || star < 1 || star > 5) {
      toast.error("Please select a rating between 1 and 5 stars");
      return;
    }

    try {
      let result = await axios.post(
        serverUrl + `/api/listing/ratings/${id}`,
        {
          ratings: star,
        },
        { withCredentials: true }
      );
      await getListing();
      await getCurrentUser();
      console.log(result);
      toast.success("Rating submitted successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to submit rating");
    }
  };

  const handleStar = async (value) => {
    setStar(value);
    console.log("You Rated : ", value);
  };

  // If no booking data and no id, redirect to home
  if (!bookingDoc && !bookingId) {
    navigate("/");
    return null;
  }

  return (
    <div className="w-[100vw] min-h-[100vh] flex  items-center justify-center gap-[30px] bg-slate-200 flex-col">
      <div
        className="w-[95%] min-w-[500px] h-[400px] bg-[white] flex items-center justify-center border-[1px]
        border-[#b5b5b5] flex-col gap-[20px] p-[20px] md:w-[80%] rounded-lg"
      >
        <div
          className="w-[100%] h-[50%] text-[20px] flex items-center justify-center flex-col gap-[20px]
            font-semibold"
        >
          <GiConfirmed className="w-[100px] h-[100px] text-[green]" />
          Booking Confirmed
        </div>
        <div className="w-[100%] flex items-center justify-between text-[16px] md:text-[18px]">
          <span>Booking Id : </span>
          <span>{bookingDoc?._id || bookingId}</span>
        </div>
        <div className="w-[100%] flex items-center justify-between text-[16px] md:text-[18px]">
          <span>Owner Details : </span>
          <span>{bookingDoc?.host?.email || ""}</span>
        </div>
        <div className="w-[100%] flex items-center justify-between text-[16px] md:text-[18px]">
          <span>Total Rent: </span>
          <span>₹ {bookingDoc?.totalRent || ""}</span>
        </div>
      </div>
      <div
        className="w-[95%] min-w-[600px] h-[200px] bg-[white] flex items-center justify-center border-[1px]
        border-[#b5b5b5] flex-col gap-[20px] p-[20px] md:w-[80%] rounded-lg"
      >
        <h1 className="text-[18px]">
          {star ? `${star} of 5 Rating` : "Select your rating"}
        </h1>
        <Star onRate={handleStar} />
        <button
          className={`px-[30px] py-[10px] text-[white] text-[18px] md:px-[100px] 
            rounded-lg text-nowrap ${
              star && star >= 1 && star <= 5
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          onClick={() =>
            handleRating(
              (bookingDoc?.listing && bookingDoc.listing._id) ||
                cardDetails?._id
            )
          }
          disabled={!star || star < 1 || star > 5}
        >
          {star && star >= 1 && star <= 5
            ? "Submit Rating"
            : "Select Rating First"}
        </button>
      </div>
      <button
        className="px-[30px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] 
            rounded-lg text-nowrap absolute top-[10px] right-[20px]"
        onClick={() => navigate("/")}
      >
        Back To Home
      </button>
    </div>
  );
}

export default Booked;
