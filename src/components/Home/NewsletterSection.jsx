import React from "react";

const NewsletterSection = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-primary-50 via-white to-primary-50 border-t border-primary-100 overflow-hidden">
      {/* Soft Background Pattern */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/pattern.svg')] bg-cover bg-center"></div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-2xl mx-auto animate-fadeUp">
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-5 text-primary-800">
            Stay Connected with <span className="text-gradient">MZ Aromas</span>
          </h2>

          {/* Subtext */}
          <p className="text-gray-700 mb-10 text-lg leading-relaxed">
            Be the first to know about our new arrivals, special discounts, and
            aromatic tips  straight to your inbox.
          </p>

          {/* Newsletter Form */}
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto bg-white/90 border border-primary-200 rounded-xl shadow-sm p-3 backdrop-blur-md">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3.5 rounded-lg bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
              required
            />
            <button
              type="submit"
              className="bg-linear-to-r from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800 text-black px-8 py-3.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-amber-300"
            >
              Subscribe
            </button>
          </form>

          {/* Small Note */}
          <p className="text-xs text-gray-500 mt-4">
            ✉️ We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
