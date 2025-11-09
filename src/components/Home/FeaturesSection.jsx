import React, { useEffect, useState } from "react";
import { FiTruck, FiAward, FiShield, FiHeadphones } from "react-icons/fi";

const FeaturesSection = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    { icon: FiTruck, title: "Free Shipping", desc: "Enjoy complimentary delivery on orders above ₹999." },
    { icon: FiAward, title: "Premium Quality", desc: "Authentic, handpicked fragrances crafted with care." },
    { icon: FiShield, title: "Secure Payment", desc: "Your transactions are always safe and encrypted." },
    { icon: FiHeadphones, title: "24/7 Support", desc: "Our fragrance experts are here for you, anytime." },
  ];

  return (
    <section
      className={`relative py-24 bg-gradient-to-b from-amber-50 via-white to-amber-50 border-t border-amber-100 overflow-hidden transition-all duration-[1400ms] ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* 🌸 Background Pattern */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/pattern.svg')] bg-cover bg-center"></div>

      <div className="relative z-10 container mx-auto px-6">
        {/* 🕯️ Section Heading */}
        <h2
          className={`font-display text-4xl md:text-5xl font-semibold text-center mb-14 text-amber-800 tracking-wide transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          Our{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-600">
            Assurance
          </span>
        </h2>

        {/* 🪔 Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={i}
              className={`group relative bg-white/90 border border-amber-200 hover:border-amber-400 backdrop-blur-md p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-700 ${
                visible ? "opacity-100" : "opacity-0"
              }`}
              style={{
                animation: "fadeUp 0.9s ease forwards",
                animationDelay: `${i * 0.15 + 0.3}s`,
              }}
            >
              {/* Icon */}
              <div className="bg-gradient-to-br from-amber-100 via-yellow-100 to-yellow-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500 border border-amber-300">
                <Icon size={32} className="text-amber-700" />
              </div>

              {/* Title */}
              <h3 className="font-display text-lg font-semibold text-amber-800 mb-2 text-center tracking-wide group-hover:text-amber-700 transition-colors duration-300">
                {title}
              </h3>

              {/* Description */}
              <p className="font-sans text-sm text-gray-600 text-center leading-relaxed max-w-[240px] mx-auto">
                {desc}
              </p>

              {/* Gold Glow Line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-2/3 h-[3px] bg-gradient-to-r from-amber-400 to-yellow-600 rounded-full transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>

      {/* ✨ Keyframe Animation */}
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;
