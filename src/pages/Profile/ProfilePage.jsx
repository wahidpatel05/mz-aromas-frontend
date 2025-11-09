import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FiUser,
  FiShoppingBag,
  FiHeart,
  FiSettings,
} from "react-icons/fi";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-amber-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white/90 border border-amber-100 rounded-2xl shadow-sm hover:shadow-md transition-all p-6">
              {/* Avatar */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={user?.avatar?.url || "/images/default-avatar.png"}
                    alt={user?.name}
                    className="w-28 h-28 rounded-full mx-auto border-4 border-amber-200 object-cover shadow-sm"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-400 to-yellow-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                    {user?.role || "User"}
                  </div>
                </div>
                <h2 className="font-semibold text-gray-900 text-xl mt-3">
                  {user?.name}
                </h2>
                <p className="text-gray-600 text-sm">{user?.email}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-amber-100/70 text-amber-800 font-medium shadow-sm"
                >
                  <FiUser />
                  <span>Profile</span>
                </Link>

                <Link
                  to="/orders"
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-amber-50 text-gray-700 transition"
                >
                  <FiShoppingBag />
                  <span>My Orders</span>
                </Link>

                <Link
                  to="/wishlist"
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-amber-50 text-gray-700 transition"
                >
                  <FiHeart />
                  <span>Wishlist</span>
                </Link>

                <Link
                  to="/settings"
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-amber-50 text-gray-700 transition"
                >
                  <FiSettings />
                  <span>Settings</span>
                </Link>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/95 border border-amber-100 rounded-2xl shadow-sm p-8 hover:shadow-md transition-all">
              <h1 className="text-3xl font-display font-bold text-amber-900 mb-8">
                Profile Information
              </h1>

              <div className="space-y-8">
                {/* Profile Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={user?.name}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-amber-400 focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user?.email}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-amber-400 focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Role
                    </label>
                    <input
                      type="text"
                      value={user?.role}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 capitalize"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Member Since
                    </label>
                    <input
                      type="text"
                      value={new Date(user?.createdAt).toLocaleDateString()}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/update-profile"
                    className="flex-1 min-w-[180px] text-center bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    Edit Profile
                  </Link>

                  <Link
                    to="/update-password"
                    className="flex-1 min-w-[180px] text-center border border-gray-300 hover:bg-gray-50 text-gray-800 py-3 rounded-lg font-semibold transition-all"
                  >
                    Change Password
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
