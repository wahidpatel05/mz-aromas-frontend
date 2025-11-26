import React, { useEffect, useState } from "react";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { IoIosPricetags } from "react-icons/io";
import { CiBeaker1 } from "react-icons/ci";
import { PiCertificate } from "react-icons/pi";
import { FiHeadphones, FiGlobe } from "react-icons/fi";

const WhyChooseUsSection = () => {
  const reasons = [
    {
      icon: <MdOutlineWorkspacePremium className="text-black" size={50} />,
      title: "Premium Quality",
      desc: "Crafted with finest ingredients",
    },
    {
      icon: <IoIosPricetags className="text-black" size={50} />,
      title: "Better Pricing",
      desc: "Top-grade fragrances at the most competitive industry rates.",
    },
    {
      icon: <CiBeaker1 className="text-black" size={50} />,
      title: "Raw Materials",
      desc: "Selecting finest ingredients across globe.",
    },
    {
      icon: <PiCertificate className="text-black" size={50} />,
      title: "ISO Certified",
      desc: "Certified quality management ensuring consistency and reliability in every batch.",
    },
  ];

  const extra = [
    {
      icon: <FiHeadphones className="text-black" size={45} />,
      title: "24/7 Support",
      desc: "Reliable support whenever you need it. ",
    },
    {
      icon: <FiGlobe className="text-black" size={45} />,
      title: "Worldwide Shipping",
      desc: "Reliable international shipping with secure packaging and timely delivery.",
    },
  ];

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
  className={`relative py-24 bg-gradient-to-b from-[#FFF8E1] via-[#FFFDF7] to-[#FFF8E1] border-t border-amber-100 overflow-hidden transition-all duration-[1500ms] ease-out ${
    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
  }`}
>

      {/* Subtle pattern for texture */}
      <div className="absolute inset-0 opacity-[0.07] bg-[url('/pattern.svg')] bg-cover bg-center mix-blend-multiply"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Heading */}
        <h2
          className={`font-display text-4xl md:text-5xl font-semibold mb-12 text-black tracking-wide transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          Why Choose{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-yellow-600">
            US?
          </span>
        </h2>

        {/* 4-column main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-16">
          {reasons.map((item, i) => (
            <div
              key={i}
              className="group  p-8 rounded-2xl  hover:border-amber-500 shadow-[0_4px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_25px_rgba(255,193,7,0.2)] hover:-translate-y-2 transition-all duration-700"
              style={{
                animation: "fadeUp 0.9s ease forwards",
                animationDelay: `${i * 0.15 + 0.3}s`,
                opacity: 0,
              }}
            >
              <div className="flex justify-center mb-5 transition-transform duration-700 group-hover:scale-110">
                {item.icon}
              </div>
              <h3 className="font-display text-xl md:text-2xl font-semibold mb-3 text-black tracking-wide group-hover:text-amber-700 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="font-sans text-gray-700 leading-relaxed text-[15px] max-w-xs mx-auto">
                {item.desc}
              </p>
              <div className="mt-6 h-[3px] w-16 bg-gradient-to-r from-amber-700 to-yellow-500 mx-auto rounded-full opacity-70 group-hover:opacity-100 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* 2-column extras */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-12 justify-center max-w-3xl mx-auto">
          {extra.map((item, i) => (
            <div
              key={i}
              className="group  p-8 rounded-2xl  hover:border-amber-500 shadow-[0_4px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_25px_rgba(255,193,7,0.2)] hover:-translate-y-2 transition-all duration-700"
              style={{
                animation: "fadeUp 0.9s ease forwards",
                animationDelay: `${i * 0.15 + 0.9}s`,
                opacity: 0,
              }}
            >
              <div className="flex justify-center mb-5 transition-transform duration-700 group-hover:scale-110">
                {item.icon}
              </div>
              <h3 className="font-display text-xl md:text-2xl font-semibold mb-3 text-black tracking-wide group-hover:text-amber-700 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="font-sans text-gray-700 leading-relaxed text-[15px] max-w-xs mx-auto">
                {item.desc}
              </p>
              <div className="mt-6 h-[3px] w-16 bg-gradient-to-r from-amber-700 to-yellow-500 mx-auto rounded-full opacity-70 group-hover:opacity-100 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(25px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUsSection;
