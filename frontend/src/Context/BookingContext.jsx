import React, { createContext, useContext, useState, useRef } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";
import { userDataContext } from "./UserContext";
import { listingDataContext } from "./ListingContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const bookingDataContext = createContext();

function BookingContext({ children }) {
  let [checkIn, setCheckIn] = useState("");
  let [checkOut, setCheckOut] = useState("");
  let [total, setTotal] = useState(0);
  let [night, setNight] = useState(0);
  let { serverUrl } = useContext(authDataContext);
  let { getCurrentUser } = useContext(userDataContext);
  let { getListing } = useContext(listingDataContext);
  let [bookingData, setBookingData] = useState([]);
  let [booking, setBooking] = useState(false);
  let navigate = useNavigate();

  // Prevent duplicate error messages
  const lastErrorRef = useRef("");
  const errorTimeoutRef = useRef(null);

  // Helper function to prevent duplicate error messages
  const showErrorOnce = (message) => {
    if (lastErrorRef.current === message) {
      return; // Don't show the same error twice
    }

    // Clear any existing timeout
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }

    // Show the error
    toast.error(message);
    lastErrorRef.current = message;

    // Reset after 3 seconds
    errorTimeoutRef.current = setTimeout(() => {
      lastErrorRef.current = "";
    }, 3000);
  };

  const resetBookingForm = () => {
    setCheckIn("");
    setCheckOut("");
    setTotal(0);
    setNight(0);
  };

  const handleBooking = async (id) => {
    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates");
      return;
    }

    // Validate dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      toast.error("Check-in date cannot be in the past");
      return;
    }

    if (checkOutDate <= checkInDate) {
      toast.error("Check-out date must be after check-in date");
      return;
    }

    if (total <= 0) {
      toast.error("Invalid booking total. Please check your dates.");
      return;
    }

    // Prevent duplicate booking attempts
    if (booking) {
      console.log("Booking already in progress, ignoring duplicate click");
      return;
    }

    setBooking(true);
    try {
      let result = await axios.post(
        serverUrl + `/api/booking/create/${id}`,
        {
          checkIn,
          checkOut,
          totalRent: total,
        },
        { withCredentials: true }
      );
      await getCurrentUser();
      await getListing();
      setBookingData(result.data);
      console.log(result.data);
      setBooking(false);
      resetBookingForm();
      navigate(`/booked/${result.data._id}`);
      toast.success("Booking Successful");
    } catch (error) {
      console.log(error);
      setBookingData(null);
      setBooking(false);
      showErrorOnce(error.response?.data?.message || "Booking failed");
    }
  };

  const cancelBooking = async (id) => {
    try {
      console.log("Attempting to cancel booking with ID:", id);
      console.log("Server URL:", serverUrl);

      let result;
      try {
        const cancelUrl = serverUrl + `/api/booking/cancel/${id}`;
        console.log("Trying first endpoint:", cancelUrl);
        result = await axios.delete(cancelUrl, {
          withCredentials: true,
        });
        console.log("First endpoint successful:", result.data);
      } catch (err) {
        console.log(
          "First endpoint failed:",
          err.response?.status,
          err.response?.data
        );
        // Fallback: try cancel by listing id if booking id not found
        if (err?.response?.status === 404) {
          const fallbackUrl =
            serverUrl + `/api/booking/cancel-by-listing/${id}`;
          console.log("Trying fallback endpoint:", fallbackUrl);
          result = await axios.delete(fallbackUrl, { withCredentials: true });
          console.log("Fallback endpoint successful:", result.data);
        } else {
          throw err;
        }
      }
      await getCurrentUser();
      await getListing();
      console.log("Final result:", result.data);
      toast.success("Cancel Booking Successful");
    } catch (error) {
      console.log("Cancel booking error:", error);
      console.log("Error response:", error.response?.data);
      showErrorOnce(
        error.response?.data?.message || "Failed to cancel booking"
      );
    }
  };

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, []);

  let value = {
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    total,
    setTotal,
    night,
    setNight,
    bookingData,
    setBookingData,
    handleBooking,
    cancelBooking,
    booking,
    setBooking,
    resetBookingForm,
  };
  return (
    <div>
      <bookingDataContext.Provider value={value}>
        {children}
      </bookingDataContext.Provider>
    </div>
  );
}

export default BookingContext;
