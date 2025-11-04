import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiHeart,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { logoutUser } from "../../store/slices/authSlice";
import logo from "../../assets/logo.png";

const categories = [
  "Attar",
  "Agarbatti",
  "Soaps",
  "Essential Oils",
  "Dhoop",
  "Gift Sets",
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items: cartItems } = useSelector((state) => state.cart);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?keyword=${searchQuery}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/70 backdrop-blur-xl shadow-md border-b border-gray-200"
          : "bg-white/90 backdrop-blur-md"
      }`}
    >
      {/* Top Bar */}
      <div className="border-b border-gray-200 py-1.5 text-[11px] sm:text-xs bg-gradient-to-r from-primary-50 via-primary-100 to-primary-50 text-gray-600">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3 sm:gap-5">
            <span>📞 +91 1234567890</span>
            <span className="hidden md:inline">✉️ info@mzaromas.com</span>
          </div>
          <div className="text-gray-700 font-medium">
            Free Shipping Above ₹999
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="max-w-6xl mx-auto px-4 py-1 flex items-center justify-between gap-4">
        {/* ✅ Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <img
            src={logo}
            alt="MZ Aromas Logo"
            className="h-25 w-auto object-contain hover:opacity-90 transition-all duration-300"
          />
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-md mx-auto"
        >
          <div className="flex w-full border border-gray-300 rounded-full overflow-hidden focus-within:ring-1 focus-within:ring-primary-400 transition-all duration-300">
            <input
              type="text"
              placeholder="Search fragrances..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-1.5 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none text-sm"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-primary-400 to-primary-600 text-white px-4 flex items-center justify-center hover:opacity-90 transition"
            >
              <FiSearch size={16} />
            </button>
          </div>
        </form>

        {/* Icons */}
        <div className="flex items-center gap-6">
          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative text-gray-700 hover:text-primary-600 transition-transform hover:scale-105"
          >
            <FiHeart size={20} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-primary-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold shadow-md">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-gray-700 hover:text-primary-600 transition-transform hover:scale-105"
          >
            <FiShoppingCart size={20} />
            {cartItems.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-primary-400 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold shadow-md">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* User Dropdown */}
          <div className="relative group">
            <button className="text-gray-700 hover:text-primary-600 transition">
              <FiUser size={20} />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg py-1.5 shadow-xl z-[60] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform scale-95 group-hover:scale-100 origin-top-right text-sm">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-4 py-1.5 text-gray-700 hover:bg-gray-100 transition"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-1.5 text-gray-700 hover:bg-gray-100 transition"
                  >
                    My Orders
                  </Link>
                  {user?.role === "admin" && (
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-1.5 text-gray-700 hover:bg-gray-100 transition"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-1.5 text-red-500 hover:bg-gray-100 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-1.5 text-gray-700 hover:bg-gray-100 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-1.5 text-gray-700 hover:bg-gray-100 transition"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-primary-600 transition-transform duration-200"
          >
            {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {/* Category Navigation */}
      {/* Main Navigation Links */}
<div className="hidden md:flex justify-center border-t border-gray-200 bg-gradient-to-r from-primary-50 to-primary-100 py-2 text-[11px] sm:text-xs tracking-[0.15em] uppercase font-medium text-gray-700">
  <div className="flex items-center gap-8 relative">
    {/* Home */}
    <Link to="/" className="hover:text-primary-600 transition">
      Home
    </Link>

    {/* Products Dropdown */}
    <div className="group relative">
      <button className="hover:text-primary-600 transition flex items-center gap-1">
        PRODUCTS
      </button>

      {/* Dropdown */}
      <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
        {[
          "Perfume Oil",
          "Aroma Chemicals",
          "Agarbatti",
          "Bakhoor",
          "Airfreshner",
          "Roll On",
        ].map((sub) => (
          <Link
            key={sub}
            to={`/products?category=${sub.toLowerCase().replace(" ", "-")}`}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition"
          >
            {sub}
          </Link>
        ))}
      </div>
    </div>

    {/* Other Pages */}
    <Link to="/blog" className="hover:text-primary-600 transition">
      Blog
    </Link>
    <Link to="/gallery" className="hover:text-primary-600 transition">
      Gallery
    </Link>
    <Link to="/contact" className="hover:text-primary-600 transition">
      Contact Us
    </Link>
  </div>
</div>


      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md animate-slideDown z-[60]">
          <div className="max-w-7xl mx-auto px-5 py-3 space-y-2 text-gray-700 text-sm">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/products?category=${cat.toLowerCase().replace(" ", "-")}`}
                className="block py-1.5 hover:text-primary-600 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                {cat}
              </Link>
            ))}
            <Link
              to="/products"
              className="block py-1.5 font-medium text-primary-700 border-t border-gray-200 mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              View All Products
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
