import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import HeroSection from "../../components/Home/HeroSection";
import FeaturesSection from "../../components/Home/FeaturesSection";
import CategoriesSection from "../../components/Home/CategoriesSection";
import FeaturedProductsSection from "../../components/Home/FeaturedProductsSection";
import WhyChooseUsSection from "../../components/Home/WhyChooseUsSection";
import NewsletterSection from "../../components/Home/NewsletterSection";
import { fetchFeaturedProducts } from "../../store/slices/productSlice";
import { fetchCategories } from "../../store/slices/categorySlice";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="bg-primary-50 text-gray-800 min-h-screen font-body">
      <HeroSection />
      <FeaturesSection />
      <FeaturedProductsSection />
      <CategoriesSection />
      <WhyChooseUsSection />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;
