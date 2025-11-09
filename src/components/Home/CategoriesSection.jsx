import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import attarImg from "../../assets/Categories/attar.jpg";
import agarbattiImg from "../../assets/Categories/Agarbatti.jpg";
import aromaChemicalsImg from "../../assets/Categories/aromachemicals.jpg";
import dhoopImg from "../../assets/Categories/dhoop.jpg";
import giftSetImg from "../../assets/Categories/giftsets.jpg";
import oilImg from "../../assets/Categories/oil.jpg";
import soapImg from "../../assets/Categories/soap.jpg";
import roomFreshnerImg from "../../assets/Categories/roomfreshner.jpg";
import scentedCandlesImg from "../../assets/Categories/scentedcandles.jpg";

const categoryImages = {
  attar: attarImg,
  agarbatti: agarbattiImg,
  "aroma chemicals": aromaChemicalsImg,
  dhoop: dhoopImg,
  "gift sets": giftSetImg,
  oil: oilImg,
  soap: soapImg,
  "room freshner": roomFreshnerImg,
  "scented candles": scentedCandlesImg,
};

const CategoriesSection = () => {
  const { categories } = useSelector((state) => state.categories);
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
      {/* 🌸 Subtle Background Texture */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/pattern.svg')] bg-cover bg-center"></div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* 🕯️ Heading */}
        <h2
          className={`text-4xl md:text-5xl font-display font-semibold mb-4 text-amber-800 tracking-wide transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          Shop by{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-600">
            Category
          </span>
        </h2>

        <p
          className={`font-sans text-gray-700 mb-14 text-lg max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-150 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          Discover our curated range of fragrances, oils, and incense crafted
          with sophistication and care.
        </p>

        {/* 🪔 Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10">
          {categories.slice(0, 10).map((category, index) => {
            const name = category.name.toLowerCase().trim();
            const image = categoryImages[name] || categoryImages["attar"];

            return (
              <Link
                key={category._id}
                to={`/products?category=${category.slug}`}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-700 hover:-translate-y-2 border border-amber-100 bg-white/90 backdrop-blur-md"
                style={{
                  animation: "fadeUp 0.9s ease forwards",
                  animationDelay: `${index * 0.12 + 0.3}s`,
                  opacity: 0,
                }}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${image})` }}
                ></div>

                {/* Golden Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent group-hover:from-black/70 transition-all duration-700"></div>

                {/* Content */}
                <div className="relative z-10 p-6 flex flex-col items-center justify-center h-56 text-white text-center">
                  <h3 className="font-display text-xl md:text-2xl font-semibold mb-1 drop-shadow-md tracking-wide">
                    {category.name}
                  </h3>
                  <p className="font-sans text-xs opacity-85 tracking-wide">
                    {category.subcategories?.length || 0} varieties
                  </p>
                  <div className="mt-3 h-[3px] w-10 bg-gradient-to-r from-amber-400 to-yellow-600 rounded-full opacity-80 group-hover:opacity-100 transition-all"></div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 🌟 Animations */}
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default CategoriesSection;
