import React, { useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../Context/ListingContext";

function ListingPage1() {
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
    editingId,
  } = useContext(listingDataContext);

  

  const handleImage1 = (e) => {
    console.log("handleImage1 e.target.files:", e.target.files);
    if (e.target.files && e.target.files.length > 0) {
      let file = e.target.files[0];
      setBackEndImage1(file);
      setFrontEndImage1(URL.createObjectURL(file));
    } else {
      console.error("No files found in handleImage1");
    }
  };

  const handleImage2 = (e) => {
    console.log("handleImage2 e.target.files:", e.target.files);
    if (e.target.files && e.target.files.length > 0) {
      let file = e.target.files[0];
      setBackEndImage2(file);
      setFrontEndImage2(URL.createObjectURL(file));
    } else {
      console.error("No files found in handleImage1");
    }
  };

  const handleImage3 = (e) => {
    console.log("handleImage3 e.target.files:", e.target.files);
    if (e.target.files && e.target.files.length > 0) {
      let file = e.target.files[0];
      setBackEndImage3(file);
      setFrontEndImage3(URL.createObjectURL(file));
    } else {
      console.error("No files found in handleImage3");
    }
  };

  return (
  <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center p-6">
    <form
      className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8 space-y-6 overflow-auto relative"
      onSubmit={(e) => {
        e.preventDefault();
        navigate("/listingpage2");
      }}
    >
      {/* Back Button */}
      <div
        onClick={() => navigate("/")}
        className="w-12 h-12 bg-red-500 cursor-pointer absolute top-6 left-6 rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition"
      >
        <FaArrowLeft className="w-6 h-6 text-white" />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        🏡 Set Up Your Home
      </h1>

      {/* Title input */}
      <div>
        <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="w-full h-12 border border-gray-300 rounded-lg px-4 text-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Give a Title"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="des" className="block text-lg font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="des"
          className="w-full h-24 border border-gray-300 rounded-lg px-4 py-2 text-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none resize-none"
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description || ""}
          placeholder="Describe your property"
        />
      </div>

      {/* Image Uploads */}
      {[1, 2, 3].map((num) => {
        const frontEndImage = eval(`frontEndImage${num}`);
        const handleImage = eval(`handleImage${num}`);
        return (
          <div key={num}>
            <label className="block text-lg font-medium text-gray-700 mb-1">
              Image {num}
            </label>
            {frontEndImage && (
              <img
                src={frontEndImage}
                alt={`preview${num}`}
                className="w-40 h-28 object-cover rounded-lg mb-2 shadow"
              />
            )}
            <input
              type="file"
              className="block w-full border border-gray-300 rounded-lg p-2 text-sm file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-red-500 file:text-white hover:file:bg-red-600 cursor-pointer"
              required={!editingId}
              onChange={handleImage}
            />
          </div>
        );
      })}

      {/* Rent */}
      <div>
        <label htmlFor="rent" className="block text-lg font-medium text-gray-700 mb-1">
          Rent
        </label>
        <input
          type="text"
          id="rent"
          className="w-full h-12 border border-gray-300 rounded-lg px-4 text-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none"
          required
          onChange={(e) => setRent(e.target.value)}
          value={rent}
          placeholder="₹ ____ / day"
        />
      </div>

      {/* City */}
      <div>
        <label htmlFor="city" className="block text-lg font-medium text-gray-700 mb-1">
          City
        </label>
        <input
          type="text"
          id="city"
          className="w-full h-12 border border-gray-300 rounded-lg px-4 text-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none"
          required
          onChange={(e) => setCity(e.target.value)}
          value={city}
          placeholder="City, Country"
        />
      </div>

      {/* Landmark */}
      <div>
        <label htmlFor="landmark" className="block text-lg font-medium text-gray-700 mb-1">
          Landmark
        </label>
        <input
          type="text"
          id="landmark"
          className="w-full h-12 border border-gray-300 rounded-lg px-4 text-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none"
          required
          onChange={(e) => setLandmark(e.target.value)}
          value={landmark}
          placeholder="Nearby Landmark"
        />
      </div>

      {/* Submit */}
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          className="px-10 py-3 bg-red-500 text-white text-lg font-medium rounded-lg shadow hover:bg-red-600 transition"
        >
          Next →
        </button>
      </div>
    </form>
  </div>
);

}

export default ListingPage1;
