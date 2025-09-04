import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { listingDataContext } from "../Context/ListingContext";
import { bookingDataContext } from "../Context/BookingContext";
import { userDataContext } from "../Context/UserContext";
import Nav from "../Component/Nav";
import { toast } from "react-toastify";
import {
  FaStar,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaRupeeSign,
} from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";

function ViewCard() {
  let { id } = useParams();
  let navigate = useNavigate();
  let {
    cardDetails,
    handleViewCard,
    startEditListing,
    handleDeleteListing,
    deleting,
  } = useContext(listingDataContext);
  let {
    handleBooking,
    booking,
    setBooking,
    resetBookingForm,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    night,
    setNight,
    total,
    setTotal,
  } = useContext(bookingDataContext);
  let { userData } = useContext(userDataContext);
  let [imgLoaded1, setImgLoaded1] = useState(false);
  let [imgLoaded2, setImgLoaded2] = useState(false);
  let [imgLoaded3, setImgLoaded3] = useState(false);
  let [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    handleViewCard(id);
    // Reset booking form when viewing a different property
    resetBookingForm();
  }, [id]);

  // Cleanup effect to reset form when component unmounts
  useEffect(() => {
    return () => {
      resetBookingForm();
    };
  }, []);

  useEffect(() => {
    if (checkIn && checkOut) {
      let inDate = new Date(checkIn);
      let outDate = new Date(checkOut);
      let n = Math.ceil((outDate - inDate) / (24 * 60 * 60 * 1000));
      setNight(n);

      if (n > 0) {
        let baseRent = (cardDetails?.rent || 0) * n;
        let airBnbCharge = baseRent * (7 / 100);
        let tax = baseRent * (7 / 100);
        setTotal(baseRent + airBnbCharge + tax);
      } else {
        setNight(0);
        setTotal(0);
      }
    }
  }, [checkIn, checkOut, cardDetails?.rent]);

  const getMinCheckoutDate = () => {
    if (!checkIn) return new Date().toISOString().split("T")[0];
    const checkInDate = new Date(checkIn);
    const nextDay = new Date(checkInDate);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.toISOString().split("T")[0];
  };

  const minDate = new Date().toISOString().split("T")[0];

  if (!cardDetails) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="h-96 bg-gray-200 rounded-lg"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-24 bg-gray-200 rounded"></div>
                  <div className="h-24 bg-gray-200 rounded"></div>
                  <div className="h-24 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const images = [
    cardDetails.image1,
    cardDetails.image2,
    cardDetails.image3,
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
          Back to listings
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/3] bg-gray-200 rounded-xl overflow-hidden">
              {!imgLoaded1 && (
                <div className="absolute inset-0 skeleton-image" />
              )}
              <img
                src={images[activeImage]}
                alt={cardDetails.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imgLoaded1 ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImgLoaded1(true)}
              />

              {/* Image Actions removed */}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative aspect-square bg-gray-200 rounded-lg overflow-hidden transition-all duration-200 ${
                      activeImage === index
                        ? "ring-2 ring-red-500"
                        : "hover:ring-2 hover:ring-gray-300"
                    }`}
                  >
                    {!imgLoaded2 && (
                      <div className="absolute inset-0 skeleton-image" />
                    )}
                    <img
                      src={image}
                      alt={`${cardDetails.title} ${index + 1}`}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        imgLoaded2 ? "opacity-100" : "opacity-0"
                      }`}
                      onLoad={() => setImgLoaded2(true)}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Property Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {cardDetails.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <FaMapMarkerAlt className="w-4 h-4" />
                  <span>
                    {cardDetails.landmark}, {cardDetails.city}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <FaStar className="w-4 h-4 text-yellow-400" />
                  <span>{cardDetails.ratings || "New"}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                <FaRupeeSign className="inline w-5 h-5" />
                {cardDetails.rent}{" "}
                <span className="text-lg font-normal text-gray-600">
                  / night
                </span>
              </div>
            </div>

            {/* Property Description */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                About this property
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Experience the perfect blend of comfort and luxury in this
                beautiful property. Located in the heart of {cardDetails.city},
                this accommodation offers everything you need for a memorable
                stay.
              </p>
            </div>

            {/* Booking or Owner Controls */}
            {userData?._id !== cardDetails?.host ? (
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Book your stay
                </h3>

                <div className="space-y-4">
                  {/* Date Selection */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Check-in
                      </label>
                      <div className="relative">
                        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="date"
                          min={minDate}
                          className="input pl-10"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Check-out
                      </label>
                      <div className="relative">
                        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="date"
                          min={getMinCheckoutDate()}
                          className="input pl-10"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  {night > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">
                          ₹{cardDetails.rent} × {night} nights
                        </span>
                        <span className="font-medium">
                          ₹{cardDetails.rent * night}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Service fee</span>
                        <span className="font-medium">
                          ₹{Math.round((cardDetails.rent * night * 7) / 100)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Taxes</span>
                        <span className="font-medium">
                          ₹{Math.round((cardDetails.rent * night * 7) / 100)}
                        </span>
                      </div>
                      <div className="border-t border-gray-300 pt-3 flex justify-between items-center">
                        <span className="font-semibold text-gray-900">
                          Total
                        </span>
                        <span className="text-xl font-bold text-gray-900">
                          ₹{Math.round(total)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Book Button */}
                  <button
                    className={`w-full btn py-4 text-lg font-semibold ${
                      night > 0 && total > 0 && !booking
                        ? "btn-primary"
                        : "btn-secondary cursor-not-allowed"
                    }`}
                    onClick={() => {
                      if (night > 0 && total > 0 && !booking) {
                        if (!userData) {
                          toast.info("Please login to book");
                          navigate("/login");
                          return;
                        }
                        handleBooking(cardDetails._id);
                      }
                    }}
                    disabled={booking || night <= 0 || total <= 0}
                  >
                    {booking ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Booking...
                      </div>
                    ) : night <= 0 ? (
                      "Select valid dates"
                    ) : (
                      "Book now"
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Owner tools
                </h3>
                <p className="text-gray-600 mb-4">
                  You own this listing. You cannot book it. You can update or
                  delete it below.
                </p>
                <div className="flex gap-3">
                  <button
                    className="btn btn-primary"
                    onClick={() => startEditListing(cardDetails)}
                  >
                    Edit Listing
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleDeleteListing(cardDetails._id)}
                    disabled={deleting}
                  >
                    {deleting ? "Deleting..." : "Delete Listing"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCard;
