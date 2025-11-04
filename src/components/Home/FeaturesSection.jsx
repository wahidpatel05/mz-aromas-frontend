import React from "react";
import { FiTruck, FiAward, FiShield, FiHeadphones } from "react-icons/fi";

const FeaturesSection = () => {
  const features = [
    { icon: FiTruck, title: "Free Shipping", desc: "On orders above ₹999" },
    { icon: FiAward, title: "Premium Quality", desc: "100% authentic fragrances" },
    { icon: FiShield, title: "Secure Payment", desc: "Your data stays encrypted" },
    { icon: FiHeadphones, title: "24/7 Support", desc: "We're always here to help" },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-primary-50 via-white to-primary-50 border-t border-primary-100 overflow-hidden">
      {/* ✨ Soft Background Pattern */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/pattern.svg')] bg-cover bg-center"></div>

      <div className="relative z-10 container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-12 text-primary-800 animate-fadeUp">
          Our <span className="text-gradient">Assurance</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={i}
              className="group relative bg-white/90 border border-primary-100 hover:border-primary-300 backdrop-blur-lg p-8 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-500 animate-fadeUp"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Icon Circle */}
              <div className="bg-linear-to-br from-primary-100 to-primary-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500 border border-primary-200">
                <Icon size={30} className="text-primary-700" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-primary-800 mb-2 text-center group-hover:text-primary-700 transition-colors">
                {title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 text-center leading-relaxed">
                {desc}
              </p>

              {/* Glow Line */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-2/3 h-[3px] bg-linear-to-r from-primary-400 to-primary-700 rounded-full transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
