import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import ListingPage1 from "./pages/ListingPage1";
import ListingPage2 from "./pages/ListingPage2";
import ListingPage3 from "./pages/ListingPage3";
import { useContext } from "react";
import { userDataContext } from "./Context/UserContext";
import MyListing from "./pages/MyListing";
import ViewCard from "./pages/ViewCard";
import MyBooking from "./pages/MyBooking";
import Booked from "./pages/Booked";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import UserProfile from "./pages/UserProfile";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
// import EditProfile from "./pages/EditProfileForm";

// Global Loading Bar Component
function LoadingBar() {
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div
        className="h-full bg-red-500 animate-pulse"
        style={{ width: "100%" }}
      />
    </div>
  );
}

function App() {
  let { userData } = useContext(userDataContext);

  // Global error handler for network errors
  useEffect(() => {
    const handleNetworkError = (event) => {
      if (event.type === "error" && event.target.tagName === "IMG") {
        toast.error("Failed to load image");
      }
    };

    window.addEventListener("error", handleNetworkError);
    return () => window.removeEventListener("error", handleNetworkError);
  }, []);

  return (
    <>
      <LoadingBar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/listingpage1"
          element={userData != null ? <ListingPage1 /> : <Navigate to={"/"} />}
        />
        <Route
          path="/listingpage2"
          element={userData != null ? <ListingPage2 /> : <Navigate to={"/"} />}
        />
        <Route
          path="/listingpage3"
          element={userData != null ? <ListingPage3 /> : <Navigate to={"/"} />}
        />
        <Route
          path="/mylisting"
          element={userData != null ? <MyListing /> : <Navigate to={"/"} />}
        />
        <Route path="/viewcard/:id" element={<ViewCard />} />
        <Route
          path="/mybooking"
          element={userData != null ? <MyBooking /> : <Navigate to={"/"} />}
        />
        <Route
          path="/booked"
          element={userData != null ? <Booked /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/booked/:bookingId"
          element={userData != null ? <Booked /> : <Navigate to={"/login"} />}
        />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/user/:id" element={<UserProfile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </>
  );
}

export default App;
