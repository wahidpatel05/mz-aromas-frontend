import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  FiSearch,
  FiDroplet,
  FiShoppingCart,
  FiUser,
  FiHeart,
  FiMenu,
  FiX,
  FiPhoneCall,
  FiMail,
  FiInstagram,
  FiMessageCircle,
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
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items: cartItems } = useSelector((state) => state.cart);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
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
      className={`relative z-[1000] font-sans transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
      } ${
        isScrolled
          ? "bg-white/85 backdrop-blur-md shadow-md border-b border-amber-100"
          : "bg-white/95"
      }`}
    >
      {/* 🌟 Top Contact Bar */}
      <div className="border-b border-amber-100 py-1.5 text-[11px] sm:text-xs bg-gradient-to-r from-amber-50 via-amber-100 to-amber-50 text-gray-700 tracking-wide">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-2 sm:gap-4">
          <div className="flex items-center flex-wrap gap-4 sm:gap-6 font-sans">
            <div className="flex items-center gap-1.5 hover:text-amber-700 transition">
              <FiPhoneCall size={13} />
              <span>+91-882-882-2020</span>
            </div>

            <div className="flex items-center gap-1.5 hover:text-amber-700 transition">
              <FiMail size={13} />
              <span>info@mzaromas.com</span>
            </div>

            <a
              href="https://www.instagram.com/mz.aromas"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-amber-700 transition"
            >
              <FiInstagram size={13} />
              <span>@mz.aromas</span>
            </a>

            <a
              href="https://wa.me/918828822020"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-amber-700 transition"
            >
              <FiMessageCircle size={13} />
              <span>+91-882-882-2020</span>
            </a>
          </div>
        </div>
      </div>

      {/* 🌸 Main Navbar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <img
            src={logo}
            alt="MZ Aromas Logo"
            className="h-14 w-auto object-contain scale-[2.5] origin-center -my-2 transition-transform duration-300 group-hover:scale-[2.7]"
          />
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-md mx-auto"
        >
          <div className="flex w-full h-10 border border-amber-200 rounded-full overflow-hidden bg-white shadow-sm focus-within:ring-1 focus-within:ring-amber-400 transition-all duration-300">
            <input
              type="text"
              placeholder="Search luxury fragrances..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-1.5 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none text-sm"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-amber-400 to-yellow-600 text-white px-4 flex items-center justify-center hover:opacity-90 transition"
            >
              <FiSearch size={20} />
            </button>
          </div>
        </form>

        {/* Icons */}
        <div className="flex items-center gap-6">
          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative text-gray-700 hover:text-amber-700 transition-transform hover:scale-110"
          >
            <FiHeart size={25} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-gray-700 hover:text-amber-700 transition-transform hover:scale-110"
          >
            <FiShoppingCart size={25} />
            {cartItems.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-yellow-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* User Dropdown */}
          <div className="relative group">
            <button className="text-gray-700 hover:text-amber-700 transition">
              <FiUser size={25} />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg py-1.5 shadow-xl z-[60] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform scale-95 group-hover:scale-100 origin-top-right text-sm font-sans">
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-amber-700 transition-transform duration-200"
          >
            {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {/* 🌸 Centered Static Bar Below Search */}
      <div className="w-full bg-gradient-to-r from-amber-50 via-amber-100 to-amber-50 py-3 border-t border-amber-200 text-center">
  <p className="text-sm sm:text-base font-semibold tracking-wide text-black uppercase flex items-center justify-center gap-2">
    <FiDroplet className="text-amber-600 text-lg sm:text-xl" />
    Manufacturers and Exporters of Perfume Oils, Industrial Fragrances, Attar Roll-On and Many More
  </p>
</div>


      {/* 🔗 Main Links Bar */}
      <div className="hidden md:flex justify-center border-t border-amber-100 bg-gradient-to-r from-amber-50 to-amber-100 py-2 text-[13px] tracking-[0.12em] uppercase font-medium text-gray-700">
        <div className="flex items-center gap-10 text-[15px] font-display">
          <Link to="/" className="hover:text-amber-700 transition">
            Home
          </Link>

          {/* Products Dropdown */}
          <div className="relative group">
            <button className="hover:text-amber-700 transition flex items-center gap-1">
              PRODUCTS
            </button>

            <div className="absolute left-0 top-full h-3 w-full"></div>

            <div
              className="absolute left-0 top-full mt-3 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 
               opacity-0 invisible scale-95 group-hover:opacity-100 group-hover:visible group-hover:scale-100 
               transition-all duration-300 z-50"
            >
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
                  to={`/products?category=${sub.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block px-5 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition"
                >
                  {sub}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/blog" className="hover:text-amber-700 transition">
            Blog
          </Link>
          <Link to="/gallery" className="hover:text-amber-700 transition">
            Gallery
          </Link>
          <Link to="/contact" className="hover:text-amber-700 transition">
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
