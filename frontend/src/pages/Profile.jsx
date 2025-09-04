import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../Context/AuthContext";
import { userDataContext } from "../Context/UserContext";

export default function Profile() {
  const { serverUrl } = useContext(authDataContext);
  const { userData, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Check if user is logged in
  useEffect(() => {
    if (!userData) {
      navigate("/login");
      return;
    }
  }, [userData, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${serverUrl}/api/user/profile`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (userData?._id) {
      fetchProfile();
    }
  }, [userData?._id, serverUrl]);

  const handleLogout = () => {
    // Clear user data and redirect to home
    if (setUserData) {
      setUserData(null);
    }
    navigate("/");
  };

  const handleEditProfile = () => {
    // TODO: Implement edit profile functionality
    navigate("/edit-profile");
    // alert("Edit profile feature coming soon!");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Profile not found</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={handleEditProfile}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* User Info Card */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {profile.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-3xl font-bold">{profile.name}</h2>
            <p className="text-gray-600 text-lg">{profile.email}</p>
            {profile.isAdmin && (
              <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                Admin
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <span className="font-semibold text-gray-600">Member Since:</span>
            <p className="text-lg">
              {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <span className="font-semibold text-gray-600">Last Updated:</span>
            <p className="text-lg">
              {new Date(profile.updatedAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <span className="font-semibold text-gray-600">Account Type:</span>
            <p className="text-lg">
              {profile.isAdmin ? "Administrator" : "Regular User"}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h3 className="text-2xl font-bold text-blue-600">
            {profile.listing?.length || 0}
          </h3>
          <p className="text-gray-600">My Listings</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h3 className="text-2xl font-bold text-green-600">
            {profile.booking?.length || 0}
          </h3>
          <p className="text-gray-600">My Bookings</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h3 className="text-2xl font-bold text-purple-600">
            ₹{" "}
            {profile.booking?.reduce(
              (total, booking) => total + (booking.totalPrice || 0),
              0
            ) || 0}
          </h3>
          <p className="text-gray-600">Total Spent</p>
        </div>
      </div>

      {/* User's Listings */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">
            My Listings ({profile.listing?.length || 0})
          </h3>
          <button
            onClick={() => navigate("/listingpage1")}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Add New Listing
          </button>
        </div>
        {profile.listing && profile.listing.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.listing.map((listing) => (
              <div
                key={listing._id}
                className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                onClick={() => navigate(`/viewcard/${listing._id}`)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{listing.title}</h4>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      listing.isBooked
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {listing.isBooked ? "Booked" : "Available"}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  {listing.city}, {listing.landmark}
                </p>
                <p className="text-indigo-600 font-semibold">
                  ₹ {listing.rent}/day
                </p>
                {listing.image1 && (
                  <img
                    src={listing.image1}
                    alt={listing.title}
                    className="w-full h-32 object-cover rounded mt-2"
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">
              You haven't created any listings yet.
            </p>
            <button
              onClick={() => navigate("/listingpage1")}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Create Your First Listing
            </button>
          </div>
        )}
      </div>

      {/* User's Bookings */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">
          My Bookings ({profile.booking?.length || 0})
        </h3>
        {profile.booking && profile.booking.length > 0 ? (
          <div className="space-y-4">
            {profile.booking.map((booking) => (
              <div
                key={booking._id}
                className="border rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">
                    Booking #{booking._id.slice(-6)}
                  </h4>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-600"
                        : booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-600">
                      Check In:
                    </span>
                    <p>{new Date(booking.checkIn).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">
                      Check Out:
                    </span>
                    <p>{new Date(booking.checkOut).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">
                      Total Price:
                    </span>
                    <p className="text-indigo-600 font-semibold">
                      ₹ {booking.totalPrice}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">
              You haven't made any bookings yet.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Browse Properties
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
