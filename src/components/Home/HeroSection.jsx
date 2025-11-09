import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import hero2 from "../../assets/hero2.jpg";
import hero3 from "../../assets/hero3.jpg";
import hero4 from "../../assets/hero4.jpg";

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
      title: "Pure Natural Attars",
      desc: "Experience the authentic essence of traditional Indian perfumery.",
      btn: "Shop Attars",
      link: "/products?category=attar",
      image: hero3,
    },
    {
      title: "Premium Agarbatti",
      desc: "Divine fragrances crafted for peace and spiritual bliss.",
      btn: "Explore Collection",
      link: "/products?category=agarbatti",
      image: hero2,
    },
    {
      title: "Luxurious Gift Sets",
      desc: "Timeless aromas, beautifully curated for your loved ones.",
      btn: "View Gift Sets",
      link: "/products?category=gift-sets",
      image: hero4,
    },
  ];

  return (
    <section
      className={`relative mb-24 font-sans overflow-hidden transition-opacity duration-[1800ms] ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* 🌸 Marquee Banner */}
      <div className="w-full bg-gradient-to-r from-amber-50 via-amber-100 to-amber-50 text-amber-800 py-3 text-xs sm:text-sm border-b border-amber-200 relative overflow-hidden font-medium tracking-wide uppercase">
        <div className="marquee-track flex whitespace-nowrap">
          <span className="mx-8">🚚 Free Delivery on Orders Above ₹999</span>
          <span className="mx-8">🌿 100% Natural & Alcohol-Free Fragrances</span>
          <span className="mx-8">🕯️ Handcrafted with Love – Only at MZ Aromas</span>
          <span className="mx-8">💎 Authentic. Long-Lasting. Luxurious.</span>
          <span className="mx-8">🌸 Discover the Essence of True Indian Perfumery</span>
          <span className="mx-8">✨ Exclusive Seasonal Discounts on Gift Sets</span>
        </div>
      </div>

      {/* 🌿 Hero Slider */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="heroSwiper h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-amber-100"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div
              className="relative h-full flex items-center justify-start"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.55), rgba(0,0,0,0.15)), url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>

              {/* Content */}
              <div className="relative z-10 container mx-auto px-6 md:px-12">
                <div
                  className="max-w-xl space-y-6 text-white animate-fadeInUp"
                  style={{ animationDelay: "0.3s" }}
                >
                  <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight text-white drop-shadow-[0_6px_20px_rgba(0,0,0,0.6)] tracking-wide">
                    {slide.title}
                  </h1>
                  <p className="font-sans text-base md:text-lg text-gray-200/90 max-w-md leading-relaxed tracking-wide">
                    {slide.desc}
                  </p>

                  <Link
                    to={slide.link}
                    className="inline-block bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 text-white px-8 py-3 rounded-full font-sans font-semibold shadow-lg shadow-amber-800/30 hover:shadow-amber-700/50 transition-all duration-300 hover:scale-[1.05]"
                  >
                    {slide.btn}
                  </Link>
                </div>
              </div>

              {/* Bottom Fade */}
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 🎨 Custom Styling */}
      <style>
        {`
          /* Marquee Animation */
          .marquee-track {
            animation: marqueePingPong 18s ease-in-out infinite alternate;
          }
          @keyframes marqueePingPong {
            0% { transform: translateX(0); }
            50% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }

          /* Swiper Pagination */
          .heroSwiper .swiper-pagination-bullet {
            background-color: rgba(255, 191, 0, 0.4);
            opacity: 1;
            width: 10px;
            height: 10px;
            transition: all 0.3s ease;
          }
          .heroSwiper .swiper-pagination-bullet-active {
            background: linear-gradient(to right, #f59e0b, #facc15);
            transform: scale(1.25);
            box-shadow: 0 0 6px rgba(245, 158, 11, 0.6);
          }

          /* Swiper Arrows */
          .heroSwiper .swiper-button-prev,
          .heroSwiper .swiper-button-next {
            color: #fbbf24;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 50%;
            width: 42px;
            height: 42px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
          }
          .heroSwiper .swiper-button-prev:hover,
          .heroSwiper .swiper-button-next:hover {
            background: rgba(0, 0, 0, 0.6);
            color: #fcd34d;
            transform: scale(1.1);
          }
          .heroSwiper .swiper-button-prev { left: 24px; }
          .heroSwiper .swiper-button-next { right: 24px; }

          .heroSwiper .swiper-pagination { bottom: 16px !important; }

          /* FadeInUp */
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
