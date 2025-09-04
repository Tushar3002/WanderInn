import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authDataContext } from "../Context/AuthContext";
import { userDataContext } from "../Context/UserContext";

export default function EditProfile() {
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);
  const { userData, setUserData, getCurrentUser } = useContext(userDataContext);

  // Guard: if not logged in, go to login
  useEffect(() => {
    if (userData === null) navigate("/login");
  }, [userData, navigate]);

  // Prefill from user
  const initial = useMemo(
    () => ({
      name: userData?.name ?? "",
      email: userData?.email ?? "",
      password: "",
    }),
    [userData]
  );

  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => setForm(initial), [initial]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.trim()) return "Email is required";
    // super-basic email check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return "Enter a valid email";
    if (form.password && form.password.length > 0 && form.password.length < 6)
      return "Password must be at least 6 characters";
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    setSubmitting(true);
    try {
      // build payload (omit empty password to avoid pointless update)
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        ...(form.password ? { password: form.password } : {}),
      };

      const res = await axios.put(`${serverUrl}/api/user/profile`, payload, {
        withCredentials: true,
      });

      // Update global user (or refetch to be safe)
      setUserData?.(res.data);
      await getCurrentUser?.();

      toast.success("Profile updated");
      navigate("/profile");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to update profile";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const onCancel = () => navigate("/profile");

return (
  <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
    
    <div className="text-center mb-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mt-10">
         Edit Your Profile
      </h1>
      <p className="text-gray-600 mt-2">
        Update your details and keep your account up to date
      </p>
    </div>

    {/* Form card */}
    <form
      onSubmit={onSubmit}
      className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-gray-200"
    >
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={onChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          placeholder="Your name"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          placeholder="you@example.com"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          New Password
        </label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          placeholder="Leave blank to keep current password"
          autoComplete="new-password"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200 transition disabled:opacity-60"
          disabled={submitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-60"
          disabled={submitting}
        >
          {submitting ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  </div>
);
}