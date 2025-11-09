import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

const Footer = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <footer
      className={`relative bg-gradient-to-b from-amber-50 via-white to-amber-100 border-t border-amber-100 text-gray-700 transition-all duration-[1200ms] ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* ✨ Soft Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/pattern.svg')] bg-cover bg-center"></div>

      {/* 🌿 Main Footer */}
      <div className="relative container mx-auto px-6 py-16 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))] gap-10 md:gap-12 text-left">
          {/* 🕯️ Brand Info */}
          <div>
            <h3 className="text-3xl font-display font-bold text-amber-800 mb-4 drop-shadow-sm">
              MZ Aromas
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Premium quality natural fragrances, attars, and aroma products for
              your spiritual and aromatic needs.
            </p>

            <div className="flex space-x-5">
              {[
                { Icon: FiFacebook, href: "https://facebook.com" },
                { Icon: FiInstagram, href: "https://instagram.com" },
                { Icon: FiTwitter, href: "https://twitter.com" },
                { Icon: FiYoutube, href: "https://youtube.com" },
              ].map(({ Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-amber-700 hover:scale-110 transition-all duration-300"
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>

          {/* ⚡ Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-amber-800 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { to: "/about", label: "About Us" },
                { to: "/products", label: "All Products" },
                { to: "/contact", label: "Contact Us" },
                { to: "/bulk-order", label: "Bulk Orders" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-gray-700 hover:text-amber-600 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 💌 Customer Service */}
          <div>
            <h4 className="text-lg font-semibold text-amber-800 mb-4">
              Customer Service
            </h4>
            <ul className="space-y-2">
              {[
                { to: "/shipping-policy", label: "Shipping Policy" },
                { to: "/return-policy", label: "Return Policy" },
                { to: "/privacy-policy", label: "Privacy Policy" },
                { to: "/terms", label: "Terms & Conditions" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-gray-700 hover:text-amber-600 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 📞 Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-amber-800 mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <FiMapPin className="mt-1 shrink-0 text-amber-600" />
                <span>Artist Village, Maharashtra, India - 400001</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiPhone className="shrink-0 text-amber-600" />
                <span>+91 1234567890</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiMail className="shrink-0 text-amber-600" />
                <span>info@mzaromas.com</span>
              </li>
            </ul>

            {/* 🌟 Certifications */}
            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-2">Certified & Trusted</p>
              <div className="flex space-x-2">
                <div className="bg-amber-100 border border-amber-300 px-3 py-1 rounded-md text-xs font-semibold text-amber-800 shadow-sm">
                  ISO Certified
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 💛 Bottom Footer */}
      <div className="border-t border-amber-100 bg-gradient-to-r from-amber-50 to-amber-100">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>© 2025 MZ Aromas. All rights reserved.</p> 
          <div className="flex space-x-6 mt-4 md:mt-0">
            <img
              src={logo}
              alt="Payment Methods"
              className="h-8 opacity-80 hover:opacity-100 transition-opacity duration-300"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
        </div>
      </div>

      {/* 🌟 Animation */}
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
