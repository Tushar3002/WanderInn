import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authDataContext } from "../Context/AuthContext";
import { userDataContext } from "../Context/UserContext";

export default function UserProfile() {
  const { id } = useParams();
  const { serverUrl } = useContext(authDataContext);
  const { userData } = useContext(userDataContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Check if user is logged in and is admin
  useEffect(() => {
    if (!userData || !userData.isAdmin) {
      navigate("/admin/login");
      return;
    }
  }, [userData, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${serverUrl}/api/admin/users/${id}/profile`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProfile();
    }
  }, [id, serverUrl]);

  const handleBack = () => {
    navigate("/admin");
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
        <p className="text-lg font-semibold text-gray-600">User not found</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold">User Profile</h1>
        </div>
      </div>

      {/* User Info Card */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {profile.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-gray-600">{profile.email}</p>
          </div>
          <div className="ml-auto">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                profile.isAdmin
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {profile.isAdmin ? "Admin" : "User"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-semibold text-gray-600">Member Since:</span>
            <p>{new Date(profile.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-600">Last Updated:</span>
            <p>{new Date(profile.updatedAt).toLocaleDateString()}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-600">User ID:</span>
            <p className="font-mono text-xs">{profile._id}</p>
          </div>
        </div>
      </div>

      {/* User's Listings */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h3 className="text-xl font-bold mb-4">
          User's Listings ({profile.listing?.length || 0})
        </h3>
        {profile.listing && profile.listing.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profile.listing.map((listing) => (
              <div
                key={listing._id}
                className="border rounded-lg p-4 hover:shadow-md transition"
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
          <p className="text-gray-500">No listings found</p>
        )}
      </div>

      {/* User's Bookings */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">
          User's Bookings ({profile.booking?.length || 0})
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
          <p className="text-gray-500">No bookings found</p>
        )}
      </div>
    </div>
  );
}
