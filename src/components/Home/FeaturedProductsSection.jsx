import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "../Product/ProductCard";

const FeaturedProductsSection = () => {
  const { featuredProducts } = useSelector((state) => state.products);
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
      {/* ✨ Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/pattern.svg')] bg-cover bg-center"></div>

      <div className="relative z-10 container mx-auto px-6">
        {/* 🕯️ Header */}
        <div
          className={`flex flex-col md:flex-row justify-between items-center mb-14 text-center md:text-left transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-3 text-amber-800 tracking-wide leading-snug">
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-600">
                Products
              </span>
            </h2>
            <p className="font-sans text-gray-700 text-lg leading-relaxed max-w-md">
              Handpicked bestsellers, crafted to awaken your senses and refine your aura.
            </p>
          </div>

          <Link
            to="/products"
            className="hidden md:inline-block font-sans text-amber-700 hover:text-amber-600 font-semibold tracking-wide underline decoration-[1.5px] underline-offset-4 transition-colors"
          >
            View All →
          </Link>
        </div>

        {/* 🌸 Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {featuredProducts.slice(0, 8).map((product, index) => (
            <div
              key={product._id}
              style={{
                animation: "fadeUp 1s ease forwards",
                animationDelay: `${index * 0.15 + 0.3}s`,
              }}
              className="opacity-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div
          className={`text-center mt-10 md:hidden transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <Link
            to="/products"
            className="inline-block font-sans text-amber-700 hover:text-amber-600 font-semibold underline decoration-[1.5px] underline-offset-4 transition-colors"
          >
            View All Products →
          </Link>
        </div>
      </div>

      {/* 🪄 Animations */}
      <style>{`
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(25px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedProductsSection;
