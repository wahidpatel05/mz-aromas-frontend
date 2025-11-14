import React from "react";
import { FiPhone, FiMail, FiInstagram, FiMapPin, FiSend } from "react-icons/fi";

const ContactPage = () => {
  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-amber-100 min-h-screen">
      {/* Header */}
      <div className="text-center py-16 bg-gradient-to-r from-amber-100 via-amber-50 to-white border-b border-amber-200">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-amber-800 mb-4">
          Contact Us
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          We’d love to hear from you! Whether you have a query about our
          fragrances, an order, or anything else — our team is ready to help.
        </p>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* 📞 Contact Info Section */}
        <div>
          <h2 className="text-2xl font-semibold text-amber-800 mb-6">
            Get in Touch
          </h2>
          <ul className="space-y-5 text-gray-700">
            <li className="flex items-center space-x-4">
              <div className="bg-amber-100 p-3 rounded-xl">
                <FiPhone className="text-amber-600" size={20} />
              </div>
              <div>
                <p className="font-semibold text-amber-800">Phone</p>
                <span>+91-882-882-2020</span>
              </div>
            </li>

            <li className="flex items-center space-x-4">
              <div className="bg-amber-100 p-3 rounded-xl">
                <FiMail className="text-amber-600" size={20} />
              </div>
              <div>
                <p className="font-semibold text-amber-800">Email</p>
                <span>info@mzaromas.com</span>
              </div>
            </li>

            <li className="flex items-center space-x-4">
              <div className="bg-amber-100 p-3 rounded-xl">
                <FiInstagram className="text-amber-600" size={20} />
              </div>
              <div>
                <p className="font-semibold text-amber-800">Instagram</p>
                <a
                  href="https://instagram.com/mz.aromas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-600 transition-colors"
                >
                  @mz.aromas
                </a>
              </div>
            </li>

            <li className="flex items-start space-x-4">
              <div className="bg-amber-100 p-3 rounded-xl">
                <FiMapPin className="text-amber-600" size={20} />
              </div>
              <div>
                <p className="font-semibold text-amber-800">Address</p>
                <p>
                  3RD FLOOR, IVY CENTRE, UNIT NO. 312, <br />
                  Next to IRIS PARK, <br />
                  Jogeshwari West, Mumbai, Maharashtra 400102
                </p>
              </div>
            </li>
          </ul>

          
          {/* Map */}
<div className="mt-10 rounded-2xl overflow-hidden shadow-md border border-amber-100 hover:shadow-lg transition-shadow duration-300">
  <iframe
    title="MZ Aromas Location"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.2013619368017!2d72.84851410000002!3d19.142661099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9ec6cfdaec5%3A0x357b675d822c1f60!2sM.Z.%20AROMAS!5e0!3m2!1sen!2sin!4v1762787773517!5m2!1sen!2sin"
    width="100%"
    height="280"
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="border-0"
  ></iframe>
</div>

        </div>

        {/* 💬 Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold text-amber-800 mb-6">
            Send Us a Message
          </h2>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-white rounded-2xl shadow-md border border-amber-100 p-8 space-y-6"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter your full name"
                className="w-full border border-gray-300 focus:border-amber-500 rounded-xl p-3 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Email
              </label>
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="w-full border border-gray-300 focus:border-amber-500 rounded-xl p-3 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Message
              </label>
              <textarea
                required
                placeholder="Type your message..."
                rows="5"
                className="w-full border border-gray-300 focus:border-amber-500 rounded-xl p-3 outline-none resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full bg-linear-to-r from-amber-400 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 text-white font-semibold py-3 rounded-xl flex justify-center items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <FiSend />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
