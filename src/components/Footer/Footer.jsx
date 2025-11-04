// src/components/Footer/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
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
  return (
    <footer className="bg-white text-gray-700 border-t border-gray-200 shadow-sm">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
              MZ Aromas
            </h3>
            <p className="text-gray-600 mb-5 leading-relaxed">
              Premium quality natural fragrances, attars, and aroma products for
              your spiritual and aromatic needs.
            </p>
            <div className="flex space-x-4">
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
                  className="text-gray-500 hover:text-amber-600 transition-colors duration-200"
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
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
                    className="text-gray-600 hover:text-amber-600 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
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
                    className="text-gray-600 hover:text-amber-600 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-gray-600">
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

            {/* Certifications */}
            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-2">Certified & Trusted</p>
              <div className="flex space-x-2">
                <div className="bg-amber-50 border border-amber-200 px-3 py-1 rounded-md text-xs font-semibold text-amber-800">
                  ISO Certified
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © 2025 MZ Aromas. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <img
                src="/images/payment-methods.png"
                alt="Payment Methods"
                className="h-8 opacity-80"
                onError={(e) => (e.target.style.display = 'none')}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
