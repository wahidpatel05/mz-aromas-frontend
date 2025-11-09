import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FiCamera, FiArrowLeft } from "react-icons/fi";
import API from "../../config/api";
import { getUserProfile } from "../../store/slices/authSlice";
import { toast } from "react-toastify";

const UpdateProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || "");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updateData = {
        ...formData,
        avatar: avatar || undefined,
      };

      await API.put("/me/update", updateData);
      dispatch(getUserProfile());
      toast.success("Profile updated successfully");
      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center space-x-2 text-gray-700 hover:text-amber-700 mb-8 transition"
          >
            <FiArrowLeft />
            <span>Back to Profile</span>
          </button>

          {/* Card */}
          <div className="bg-white/95 border border-amber-100 rounded-2xl shadow-md hover:shadow-lg transition-all p-8">
            <div className="text-center mb-10">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <FiCamera className="text-amber-700" size={28} />
              </div>
              <h1 className="text-3xl font-display font-bold text-amber-900">
                Update Profile
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Keep your information up-to-date for a better experience
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Avatar Upload */}
              <div className="flex justify-center">
                <div className="relative group">
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="w-32 h-32 rounded-full object-cover border-4 border-amber-200 shadow-sm transition-transform duration-300 group-hover:scale-105"
                  />
                  <label className="absolute bottom-0 right-0 bg-gradient-to-r from-amber-400 to-yellow-600 text-white p-3 rounded-full cursor-pointer shadow-md hover:from-amber-500 hover:to-yellow-700 transition-all">
                    <FiCamera size={18} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  {loading ? "Updating..." : "Update Profile"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  className="flex-1 border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 py-3 rounded-lg font-semibold transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
