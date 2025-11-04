import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// ✅ Import category images correctly (match exact filenames)
import attarImg from "../../assets/Categories/attar.jpg";
import agarbattiImg from "../../assets/Categories/Agarbatti.jpg";
import aromaChemicalsImg from "../../assets/Categories/aromachemicals.jpg";
import dhoopImg from "../../assets/Categories/dhoop.jpg";
import giftSetImg from "../../assets/Categories/giftsets.jpg";
import oilImg from "../../assets/Categories/oil.jpg";
import soapImg from "../../assets/Categories/soap.jpg";
import roomFreshnerImg from "../../assets/Categories/roomfreshner.jpg";
import scentedCandlesImg from "../../assets/Categories/scentedcandles.jpg";

// ✅ Mapping for category name → image
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

  return (
    <section className="relative py-24 bg-gradient-to-b from-primary-50 via-white to-primary-50 border-t border-primary-100 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/pattern.svg')] bg-cover bg-center"></div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-primary-800 tracking-wide animate-fadeUp">
          Shop by <span className="text-gradient">Category</span>
        </h2>
        <p className="text-gray-700 mb-14 text-lg max-w-2xl mx-auto animate-fadeUp delay-200">
          Explore our wide collection of aromatic treasures crafted with care and luxury.
        </p>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10">
          {categories.slice(0, 10).map((category, index) => {
            const name = category.name.toLowerCase().trim();
            const image =
              categoryImages[name] ||
              categoryImages["attar"]; // fallback image

            return (
              <Link
                key={category._id}
                to={`/products?category=${category.slug}`}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-700 hover:-translate-y-2 border border-primary-100"
                style={{
                  animation: `fadeUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${image})` }}
                ></div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-700"></div>

                {/* Content */}
                <div className="relative z-10 p-6 flex flex-col items-center justify-center h-56 text-white text-center">
                  <h3 className="text-lg md:text-xl font-semibold mb-1">
                    {category.name}
                  </h3>
                  <p className="text-xs opacity-80">
                    {category.subcategories?.length || 0} varieties
                  </p>
                  <div className="mt-3 h-[3px] w-10 bg-gradient-to-r from-primary-400 to-primary-700 rounded-full opacity-80 group-hover:opacity-100 transition-all"></div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
