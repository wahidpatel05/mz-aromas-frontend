import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPhone, FiMail, FiInstagram } from "react-icons/fi";
import logo from "../../assets/bg_logo.png";

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
      {/* 🌿 Main Footer */}
      <div className="relative container mx-auto px-6 py-14 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20 text-left ">

          {/* 🕯️ Brand + Address (Logo perfectly centered) */}
          <div className="flex flex-col items-left md:items-start text-center md:text-left">
            <img
              src={logo}
              alt="MZ Aromas"
              className="h-8 w-auto object-contain mb-4 "
            />
            <p className="text-gray-700 text-sm leading-relaxed">
              <span className="font-semibold text-amber-800">Address:</span> <br />
              3RD FLOOR, IVY CENTRE, UNIT NO. 312,<br />
              Next to IRIS PARK,<br />
              Jogeshwari West, Mumbai,<br />
              Maharashtra 400102
            </p>
          </div>

          {/* ⚡ Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-amber-800 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact Us" },
                { to: "/shipping-policy", label: "Shipping Policy" },
                { to: "/privacy-policy", label: "Privacy Policy" },
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

          {/* 📞 Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-amber-800 mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center space-x-3">
                <FiPhone className="text-amber-600" />
                <span>+91-882-882-2020</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiMail className="text-amber-600" />
                <span>info@mzaromas.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiInstagram className="text-amber-600" />
                <a
                  href="https://instagram.com/mz.aromas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-600 transition-colors"
                >
                  @mz.aromas
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 💛 Bottom Footer */}
      <div className="border-t border-amber-100 bg-gradient-to-r from-amber-50 to-amber-100">
        <div className="container mx-auto px-6 py-5 flex flex-col md:flex-row justify-center items-center text-sm text-gray-600">
          <p>© 2025 MZ Aromas. All rights reserved.</p>
        </div>
      </div>

      {/* 🌟 Fade Animation */}
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
