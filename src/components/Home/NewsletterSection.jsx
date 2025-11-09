import React, { useEffect, useState } from "react";

const NewsletterSection = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`relative py-24 bg-gradient-to-b from-amber-50 via-white to-amber-50 border-t border-amber-100 overflow-hidden transition-all duration-[1500ms] ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* 🌸 Background Texture */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/pattern.svg')] bg-cover bg-center"></div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div
          className={`max-w-2xl mx-auto transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {/* ✨ Heading */}
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-5 text-amber-800 tracking-wide">
            Stay Connected with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-600">
              MZ Aromas
            </span>
          </h2>

          {/* 🕯️ Subtext */}
          <p className="text-gray-700 mb-10 text-lg leading-relaxed">
            Be the first to know about our new arrivals, exclusive offers, and
            aromatic inspiration straight to your inbox.
          </p>

          {/* 📬 Newsletter Form */}
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto bg-white/80 border border-amber-200 rounded-xl shadow-md p-3 backdrop-blur-md hover:shadow-lg transition-all duration-500">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3.5 rounded-lg bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 text-white px-8 py-3.5 rounded-lg font-semibold shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03]"
            >
              Subscribe
            </button>
          </form>

          {/* 🕊️ Privacy Note */}
          <p className="text-xs text-gray-500 mt-5">
            ✉️ We respect your privacy  unsubscribe anytime.
          </p>
        </div>
      </div>

      {/* 🌟 Animation */}
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default NewsletterSection;
