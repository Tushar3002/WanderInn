import React, { useContext } from "react";
import { FaArrowLeft, FaMapMarkerAlt, FaHome, FaTag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../Context/ListingContext";

function ListingPage3() {
  let navigate = useNavigate();
  let {
    title,
    setTitle,
    description,
    setDescription,
    frontEndImage1,
    setFrontEndImage1,
    frontEndImage2,
    setFrontEndImage2,
    frontEndImage3,
    setFrontEndImage3,
    backEndImage1,
    setBackEndImage1,
    backEndImage2,
    setBackEndImage2,
    backEndImage3,
    setBackEndImage3,
    rent,
    setRent,
    city,
    setCity,
    landmark,
    setLandmark,
    category,
    setCategory,
    handleAddListing,
    handleUpdateListing,
    adding,
    setAdding,
    editingId,
  } = useContext(listingDataContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/listingpage2")}
            className="flex items-center justify-center w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <FaArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {editingId ? "Review & Update" : "Review & Submit"}
            </h1>
            <p className="text-gray-600 mt-1">
              {editingId
                ? "Review your changes and update the listing"
                : "Review your listing details before submitting"}
            </p>
          </div>
        </div>

        {/* Location Header */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <FaMapMarkerAlt className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-900">
              {landmark && city ? `${landmark}, ${city}` : "Location"}
            </h2>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Property Images
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Image */}
            <div className="lg:col-span-2">
              <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden border-2 border-gray-300">
                {frontEndImage1 ? (
                  <img
                    src={frontEndImage1}
                    alt="Main property image"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <FaHome className="w-16 h-16" />
                  </div>
                )}
              </div>
            </div>

            {/* Side Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden border-2 border-gray-300">
                {frontEndImage2 ? (
                  <img
                    src={frontEndImage2}
                    alt="Property image 2"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <FaHome className="w-12 h-12" />
                  </div>
                )}
              </div>
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden border-2 border-gray-300">
                {frontEndImage3 ? (
                  <img
                    src={frontEndImage3}
                    alt="Property image 3"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <FaHome className="w-12 h-12" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Property Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-lg font-medium text-gray-900">
                  {title || "No title provided"}
                </p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2">
                  <FaTag className="w-4 h-4 text-red-500" />
                  <span className="text-lg font-medium text-gray-900">
                    {category || "No category specified"}
                  </span>
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 min-h-[80px]">
                <p className="text-gray-900 leading-relaxed">
                  {description || "No description provided"}
                </p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rent per Night
              </label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-2xl font-bold text-red-600">
                  ₹{rent || "0"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            className={`px-12 py-4 text-xl font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl ${
              adding
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
            onClick={() =>
              editingId ? handleUpdateListing(editingId) : handleAddListing()
            }
            disabled={adding}
          >
            {adding ? (
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                {editingId ? "Updating..." : "Adding..."}
              </div>
            ) : editingId ? (
              "Update Listing"
            ) : (
              "Add Listing"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListingPage3;
