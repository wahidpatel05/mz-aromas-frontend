import React, { useEffect, useState } from "react";

const WhyChooseUsSection = () => {
  const reasons = [
    {
      emoji: "🌿",
      title: "100% Natural",
      desc: "Made from pure, natural ingredients with no harmful chemicals. No additives — only available at MZ Aromas.",
    },
    {
      emoji: "🏆",
      title: "Premium Quality",
      desc: "Finest raw materials and traditional craftsmanship ensure unmatched quality and long-lasting fragrance.",
    },
    {
      emoji: "🇮🇳",
      title: "Made in India",
      desc: "Proudly crafted in India using authentic age-old techniques with a modern luxurious touch.",
    },
  ];

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`relative py-24 bg-gradient-to-b from-amber-50 via-white to-amber-50 border-t border-amber-100 overflow-hidden transition-all duration-[1500ms] ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* 🌸 Background Pattern */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/pattern.svg')] bg-cover bg-center"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* 🕯️ Heading */}
        <h2
          className={`font-display text-4xl md:text-5xl font-semibold mb-12 text-amber-800 tracking-wide transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          Why Choose{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-600">
            MZ Aromas?
          </span>
        </h2>

        {/* 🌿 Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {reasons.map((item, i) => (
            <div
              key={i}
              className="group bg-white/90 p-10 rounded-2xl border border-amber-100 hover:border-amber-300 backdrop-blur-md shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-700"
              style={{
                animation: "fadeUp 0.9s ease forwards",
                animationDelay: `${i * 0.15 + 0.3}s`,
                opacity: 0,
              }}
            >
              {/* Emoji Icon */}
              <div className="text-6xl mb-5 transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)]">
                {item.emoji}
              </div>

              {/* Title */}
              <h3 className="font-display text-xl md:text-2xl font-semibold mb-3 text-amber-800 tracking-wide group-hover:text-amber-700 transition-colors duration-300">
                {item.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-gray-700 leading-relaxed text-[15px] max-w-sm mx-auto">
                {item.desc}
              </p>

              {/* Accent Line */}
              <div className="mt-6 h-[3px] w-16 bg-gradient-to-r from-amber-400 to-yellow-600 mx-auto rounded-full opacity-70 group-hover:opacity-100 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>

      {/* 🌟 Animation */}
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
