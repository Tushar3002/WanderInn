import React, { useContext, useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../Context/UserContext";
import { authDataContext } from "../Context/AuthContext";
import Card from "../Component/Card";

function MyBooking() {
  let navigate = useNavigate();
  let { userData, getCurrentUser } = useContext(userDataContext);
  let { serverUrl } = useContext(authDataContext);
  let [bookings, setBookings] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      console.log("🔍 Checking user data for bookings...");
      console.log("userData:", userData);
      console.log("userData.booking:", userData?.booking);

      if (!userData?.booking || userData.booking.length === 0) {
        console.log("❌ No booking data found in userData");
        setLoading(false);
        setBookings([]);
        return;
      }

      // Since getCurrentUser now properly populates booking data with listing details,
      // we can use it directly instead of making individual API calls
      console.log("✅ Using populated booking data from context");
      setBookings(userData.booking);
      setLoading(false);
    };

    fetchBookings();
  }, [userData]);

  // Debug logging
  console.log("userData:", userData);
  console.log("userData.booking:", userData?.booking);
  console.log("bookings state:", bookings);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <FaArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          </div>

          {/* Loading State */}
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 font-medium">
                Loading your bookings...
              </p>
              <p className="text-gray-500 mt-2">
                Please wait while we fetch your reservation details
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <FaArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
            <p className="text-gray-600 mt-1">
              {bookings.length > 0
                ? `You have ${bookings.length} active booking${
                    bookings.length > 1 ? "s" : ""
                  }`
                : "No active bookings found"}
            </p>
          </div>
        </div>

        {/* Bookings Grid */}
        {bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="transform hover:scale-105 transition-all duration-200"
              >
                <Card
                  title={booking.listing?.title || "N/A"}
                  landmark={booking.listing?.landmark || "N/A"}
                  city={booking.listing?.city || "N/A"}
                  image1={booking.listing?.image1 || ""}
                  image2={booking.listing?.image2 || ""}
                  image3={booking.listing?.image3 || ""}
                  rent={booking.listing?.rent || 0}
                  id={booking.listing?._id || booking._id}
                  bookingId={booking._id}
                  isBooked={booking.listing?.isBooked || false}
                  host={booking.listing?.host || ""}
                  ratings={booking.listing?.ratings || 0}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCalendarAlt className="w-12 h-12 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No Bookings Yet
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                You haven't made any bookings yet. Start exploring our amazing
                properties and book your next memorable stay!
              </p>
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Explore Properties
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBooking;
