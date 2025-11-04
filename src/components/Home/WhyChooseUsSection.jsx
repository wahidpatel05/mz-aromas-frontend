import React from "react";

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

  return (
    <section className="relative py-24 bg-gradient-to-b from-primary-50 via-white to-primary-50 border-t border-primary-100 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/pattern.svg')] bg-cover bg-center"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-primary-800 tracking-wide">
          Why Choose <span className="text-gradient">MZ Aromas?</span>
        </h2>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {reasons.map((item, i) => (
            <div
              key={i}
              className="group bg-white/90 p-10 rounded-2xl border border-primary-100 hover:border-primary-200 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:bg-gradient-to-b hover:from-primary-50 hover:to-white"
            >
              <div className="text-6xl mb-5 transition-transform duration-500 group-hover:scale-110">
                {item.emoji}
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-primary-800 tracking-wide">
                {item.title}
              </h3>
              <p className="text-gray-700 leading-relaxed max-w-sm mx-auto">
                {item.desc}
              </p>

              {/* Accent line */}
              <div className="mt-6 h-[3px] w-16 bg-gradient-to-r from-primary-400 to-primary-700 mx-auto rounded-full opacity-70 group-hover:opacity-100 transition-all"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
