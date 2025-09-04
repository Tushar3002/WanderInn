// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { userDataContext } from "../Context/UserContext";
// import { toast } from "react-toastify";

// const EditProfileForm = () => {
//   const { userData, setUserData } = useContext(userDataContext);
//   const [name, setName] = useState(userData?.name || "");
//   const [email, setEmail] = useState(userData?.email || "");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axios.put(
//         `${process.env.REACT_APP_SERVER_URL}/api/user/profile`,
//         { name, email, password },
//         { withCredentials: true }
//       );
//       setUserData(res.data.user);
//       toast.success("Profile updated!");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Update failed");
//     }
//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
//       <h2 className="text-xl mb-4">Edit Profile</h2>
//       <label>Name</label>
//       <input
//         type="text"
//         value={name}
//         onChange={e => setName(e.target.value)}
//         className="w-full mb-2 p-2 border rounded"
//         required
//       />
//       <label>Email</label>
//       <input
//         type="email"
//         value={email}
//         onChange={e => setEmail(e.target.value)}
//         className="w-full mb-2 p-2 border rounded"
//         required
//       />
//       <label>New Password</label>
//       <input
//         type="password"
//         value={password}
//         onChange={e => setPassword(e.target.value)}
//         className="w-full mb-4 p-2 border rounded"
//         placeholder="Leave blank to keep current password"
//       />
//       <button
//         type="submit"
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//         disabled={loading}
//       >
//         {loading ? "Updating..." : "Update Profile"}
//       </button>
//     </form>
//   );
// };

// export default EditProfileForm;