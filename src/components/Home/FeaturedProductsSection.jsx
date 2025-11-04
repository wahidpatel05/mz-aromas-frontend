import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "../Product/ProductCard";

const FeaturedProductsSection = () => {
  const { featuredProducts } = useSelector((state) => state.products);

  return (
    <section className="relative py-24 bg-gradient-to-b from-primary-50 via-white to-primary-50 border-t border-primary-100 overflow-hidden">
      {/* ✨ Subtle Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/pattern.svg')] bg-cover bg-center"></div>

      <div className="relative z-10 container mx-auto px-6">
        {/* 🕯️ Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-14 text-center md:text-left">
          <div className="animate-fadeUp">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-3 text-primary-800 tracking-wide">
              Featured <span className="text-gradient">Products</span>
            </h2>
            <p className="text-gray-700 text-lg">
              Handpicked bestsellers, curated for your senses.
            </p>
          </div>
          <Link
            to="/products"
            className="hidden md:inline-block text-primary-700 hover:text-primary-600 font-semibold underline decoration-2 underline-offset-4 transition-colors animate-fadeUp"
            style={{ animationDelay: "0.2s" }}
          >
            View All →
          </Link>
        </div>

        {/* 🌸 Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {featuredProducts.slice(0, 8).map((product, index) => (
            <div
              key={product._id}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="animate-fadeUp"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="text-center mt-10 md:hidden animate-fadeUp">
          <Link
            to="/products"
            className="inline-block text-primary-700 hover:text-primary-600 font-semibold underline decoration-2 underline-offset-4 transition-colors"
          >
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
