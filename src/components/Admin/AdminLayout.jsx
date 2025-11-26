// src/components/Admin/AdminLayout.jsx
import React, { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FiHome,
  FiShoppingBag,
  FiPackage,
  FiUsers,
  FiGrid,
  FiBarChart2,
  FiMenu,
  FiX,
  FiLogOut,
} from "react-icons/fi";
import { logoutUser } from "../../store/slices/authSlice";
import logo from "../../assets/bg_logo.png";

const AdminLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const menuItems = [
    { path: "/admin/dashboard", icon: FiBarChart2, label: "Dashboard" },
    { path: "/admin/products", icon: FiShoppingBag, label: "Products" },
    { path: "/admin/categories", icon: FiGrid, label: "Categories" },
    { path: "/admin/orders", icon: FiPackage, label: "Orders" },
    { path: "/admin/users", icon: FiUsers, label: "Users" },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="MZ Aromas Logo"
            className="h-12 w-auto object-contain"
          />


          <span className="text-lg font-display font-semibold text-amber-700 tracking-wide">
            Admin
          </span>
        </Link>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-600 hover:text-gray-900 transition"
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-40 shadow-sm ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Logo Section */}
          <div className="hidden lg:flex flex-col items-center justify-center py-6 border-b border-gray-100">
            <Link to="/" className="flex flex-col items-center space-y-2">
              <img
                src={logo}
                alt="MZ Aromas Logo"
                className="h-12 - w-auto object-contain"
              />
              <p className="text-sm text-gray-500 font-medium">Admin Panel</p>
            </Link>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <img
                src={user?.avatar?.url || "/images/default-avatar.png"}
                alt={user?.name}
                className="w-12 h-12 rounded-full border-2 border-amber-100"
              />
              <div>
                <p className="font-semibold text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-amber-50 text-amber-700 shadow-sm"
                      : "text-gray-700 hover:bg-gray-50 hover:text-amber-600"
                  }`}
                >
                  <Icon size={19} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white">
            <Link
              to="/"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-amber-600 transition-colors mb-2 text-sm"
            >
              <FiHome size={19} />
              <span>Back to Store</span>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm"
            >
              <FiLogOut size={19} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
