import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronDown } from "lucide-react";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import {
  FiTruck,
  FiDroplet,
  FiHeart,
  FiGift,
} from "react-icons/fi";
import { BsFlower1, BsGem } from "react-icons/bs";

import hero2 from "../../assets/hero2.jpg";
import hero4 from "../../assets/hero4.jpg";
import hero6 from "../../assets/mz.jpeg";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const slides = [
    {
      title: "",
      desc: "",
      btn: "",
      link: "#featured-products",
      image: hero6,
      showScroll: true,
    },
    {
      title: "Premium Agarbatti",
      desc: "Divine fragrances crafted for peace and spiritual bliss.",
      btn: "Explore Collection",
      link: "/products?category=agarbatti",
      image: hero2,
      showScroll: false,
    },
    {
      title: "Luxurious Gift Sets",
      desc: "Timeless aromas, beautifully curated for your loved ones.",
      btn: "View Gift Sets",
      link: "/products?category=gift-sets",
      image: hero4,
      showScroll: false,
    },
  ];

  const marqueeItems = [
    { icon: <FiTruck className="text-amber-700" />, text: "Shipping All Across Worldwide" },
    { icon: <FiDroplet className="text-amber-700" />, text: "100% Natural & Alcohol-Free Fragrances" },
    { icon: <FiHeart className="text-amber-700" />, text: "Handcrafted with Love – Only at MZ Aromas" },
    { icon: <BsGem className="text-amber-700" />, text: "Authentic. Long-Lasting. Luxurious." },
    { icon: <BsFlower1 className="text-amber-700" />, text: "Discover the Essence of True Indian Perfumery" },
    { icon: <FiGift className="text-amber-700" />, text: "Exclusive Seasonal Discounts on Gift Sets" },
  ];

  return (
    <section
      className={`relative mb-24 font-sans overflow-hidden transition-opacity duration-[1800ms] ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* 🌟 Marquee Banner */}
      <div className="w-full bg-gradient-to-r from-[#FFF8E1] via-[#FFFDF7] to-[#FFF8E1] text-amber-800 py-3 text-xs sm:text-sm border-b border-amber-200 relative overflow-hidden font-medium tracking-wide uppercase">
        <div className="marquee-track flex whitespace-nowrap items-center gap-10">
          {marqueeItems.map((item, idx) => (
            <span key={idx} className="flex items-center gap-2 mx-8 text-[13px] sm:text-sm">
              {item.icon}
              {item.text}
            </span>
          ))}
        </div>
      </div>

      {/* 🌿 Hero Slider */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="heroSwiper h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-amber-100"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div
              className="relative h-full flex items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.40), rgba(0,0,0,0.20)), url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay - reduced blur now */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent"></div>

              {/* Content */}
              <div className="relative z-10 container mx-auto px-6 md:px-12">
                <div
                  className={`max-w-xl text-white animate-fadeInUp ${
                    slide.showScroll
                      ? "flex flex-col items-center justify-center text-center pt-40"
                      : "space-y-6"
                  }`}
                  style={{ animationDelay: "0.3s" }}
                >
                  {/* Normal Slides */}
                  {!slide.showScroll && (
                    <>
                      <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight drop-shadow-[0_6px_20px_rgba(0,0,0,0.6)]">
                        {slide.title}
                      </h1>

                      <p className="font-sans text-base md:text-lg text-gray-200/90 max-w-md">
                        {slide.desc}
                      </p>

                      <Link
                        to={slide.link}
                        className="inline-block bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 text-white px-8 py-3 rounded-full font-sans font-semibold shadow-lg shadow-amber-800/30 hover:shadow-amber-700/50 transition-all duration-300 hover:scale-[1.05]"
                      >
                        {slide.btn}
                      </Link>
                    </>
                  )}

                  {/* FIRST SLIDE – Explore More Button */}
                  {slide.showScroll && (
                    <div className="pt-10 mt-40 -ml-100">
                      <a
                        href="#featured-products"
                        className="
                          group inline-flex items-center gap-3 px-5 py-3
                          rounded-full backdrop-blur-md
                          bg-white/10 border border-amber-400/40
                          shadow-[0_4px_20px_rgba(255,200,0,0.25)]
                          hover:shadow-[0_6px_28px_rgba(255,200,0,0.45)]
                          transition-all duration-300
                        "
                      >
                        <ChevronDown
                          className="
                            w-6 h-6 text-amber-300
                            drop-shadow-[0_0_8px_rgba(255,200,0,0.6)]
                            transition-all duration-300
                            group-hover:translate-y-0.5
                          "
                        />

                        <span
                          className="
                            text-amber-300 font-semibold text-lg tracking-wider
                            drop-shadow-[0_0_8px_rgba(255,200,0,0.5)]
                          "
                        >
                          Explore More
                        </span>
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Fade bottom */}
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 🎨 Custom Styling */}
      <style>
        {`
          .marquee-track {
            animation: marqueePingPong 18s ease-in-out infinite alternate;
          }
          @keyframes marqueePingPong {
            0% { transform: translateX(0); }
            50% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp {
            animation: fadeInUp 1s ease forwards;
          }
        `}
      </style>
    </section>
  );
};

export default HeroSection;
