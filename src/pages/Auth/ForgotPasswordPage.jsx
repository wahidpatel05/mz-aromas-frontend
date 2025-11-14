import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import API from "../../config/api";
import { toast } from "react-toastify";
import logo from "../../assets/bg_logo.png";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await API.post("/password/forgot", { email });
      toast.success(data.message);
      setEmailSent(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative glowing orbs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-amber-200/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-300/30 rounded-full blur-3xl animate-pulse delay-200"></div>

      <div className="relative max-w-md w-full z-10 backdrop-blur-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link  className="inline-block mb-6">
            <img
              src={logo}
              alt="MZ Aromas Logo"
              className="h-8 w-auto mx-auto drop-shadow-md transition-transform hover:scale-[1.2] duration-300"
            />
          </Link>
        </div>

        {/* Back Link */}
        <Link
          to="/login"
          className="flex items-center justify-center gap-2 text-gray-600 hover:text-amber-700 mb-6 transition-colors"
        >
          <FiArrowLeft size={18} />
          <span className="font-medium">Back to Login</span>
        </Link>

        {/* Card */}
        <div className="bg-white/90 rounded-2xl shadow-xl border border-amber-100 p-8 backdrop-blur-md hover:shadow-amber-200/50 transition-shadow duration-500">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiMail className="text-amber-600" size={32} />
            </div>
            <h1 className="text-3xl font-display font-bold text-amber-800 mb-2">
              Forgot Password?
            </h1>
            <p className="text-gray-600 text-sm">
              {emailSent
                ? "Check your inbox for reset instructions ✉️"
                : "Enter your registered email address below"}
            </p>
          </div>

          {/* Form / Confirmation */}
          {!emailSent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="relative">
                  <FiMail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600"
                    size={20}
                  />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all text-gray-800 placeholder-gray-400"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-400 to-yellow-600 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-amber-500 hover:to-yellow-700 transition-all duration-300 disabled:opacity-60 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 animate-fadeIn">
                <p className="text-green-800 text-sm leading-relaxed">
                  We've sent a password reset link to{" "}
                  <strong className="text-green-700">{email}</strong>.
                </p>
              </div>
              <p className="text-xs text-gray-600 mb-6">
                Didn’t receive the email? Check your spam folder or try again.
              </p>
              <button
                onClick={() => setEmailSent(false)}
                className="text-amber-700 hover:text-amber-800 font-medium transition-colors"
              >
                Send Again
              </button>
            </div>
          )}
        </div>

        {/* Footer Text */}
        <p className="text-center text-xs text-gray-600 mt-6">
          Need more help?{" "}
          <Link to="/contact" className="text-amber-700 hover:underline">
            Contact Support
          </Link>
        </p>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ForgotPasswordPage;
