import React, { useContext } from "react";
import { FaArrowLeft, FaHome, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../Context/UserContext";
import Card from "../Component/Card";
import { listingDataContext } from "../Context/ListingContext";
import { useState } from "react";

function MyListing() {
  let navigate = useNavigate();
  let { userData } = useContext(userDataContext);
  const { startEditListing, handleDeleteListing, deleting } =
    useContext(listingDataContext);
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [frontEndImage1, setFrontEndImage1] = useState(null);
  let [frontEndImage2, setFrontEndImage2] = useState(null);
  let [frontEndImage3, setFrontEndImage3] = useState(null);
  let [backEndImage1, setBackEndImage1] = useState(null);
  let [backEndImage2, setBackEndImage2] = useState(null);
  let [backEndImage3, setBackEndImage3] = useState(null);
  let [rent, setRent] = useState("");
  let [city, setCity] = useState("");
  let [landmark, setLandmark] = useState("");

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
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">My Listings</h1>
            <p className="text-gray-600 mt-1">
              {userData?.listing?.length > 0
                ? `You have ${userData.listing.length} propert${
                    userData.listing.length > 1 ? "ies" : "y"
                  } listed`
                : "No properties listed yet"}
            </p>
          </div>
          <button
            onClick={() => navigate("/listingpage1")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <FaPlus className="w-4 h-4" />
            Add New Listing
          </button>
        </div>

        {/* Listings Grid */}
        {userData?.listing && userData.listing.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {userData.listing.map((list) => (
              <div key={list._id} className="group">
                <div className="transform hover:scale-105 transition-all duration-200">
                  <Card
                    title={list.title}
                    landmark={list.landmark}
                    city={list.city}
                    image1={list.image1}
                    image2={list.image2}
                    image3={list.image3}
                    rent={list.rent}
                    id={list._id}
                    isBooked={list.isBooked}
                    host={list.host}
                    ratings={list.ratings}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4 justify-center">
                  <button
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                    onClick={() => startEditListing(list)}
                  >
                    Edit Listing
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleDeleteListing(list._id)}
                    disabled={deleting}
                  >
                    {deleting ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Deleting...
                      </div>
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHome className="w-12 h-12 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No Listings Yet
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                You haven't listed any properties yet. Start sharing your
                amazing spaces with travelers and earn money!
              </p>
              <button
                onClick={() => navigate("/listingpage1")}
                className="inline-flex items-center gap-2 px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <FaPlus className="w-4 h-4" />
                List Your First Property
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyListing;
