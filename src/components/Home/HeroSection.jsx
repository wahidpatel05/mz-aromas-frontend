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

import hero2 from "../../assets/hero2.png";
import hero4 from "../../assets/Categories/banner3.png";
import hero6 from "../../assets/mz_hero.jpeg";

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
      title: "Fragrances & Flavours Manufacturer",
      desc: "",
      btn: "",
      link: "#featured-products",
      image: hero6,
      showScroll: true,
    },
    {
      title: <>Powered by <br/> advanced formulation</>,
      desc: "Using finest quality of raw materials",
      btn: "",
      link: "",
      image: hero2,
      showScroll: false,
    },
    {
      title: "Exporting Finest Quality Fragrance Worldwide",
      desc: "",
      btn: "",
      link: "",
      image: hero4,
      showScroll: false,
    },
  ];

  const marqueeItems = [
    { icon: <FiTruck className="text-amber-700" />, text: "Shipping all across worldwide" },
    { icon: <FiDroplet className="text-amber-700" />, text: "Crafting excellence in every drop" },
    { icon: <FiHeart className="text-amber-700" />, text: "Your reliable parter in fragrance manufacturing" },
    { icon: <BsGem className="text-amber-700" />, text: "100% natural & Alcohol-free fragrances" },
    { icon: <BsFlower1 className="text-amber-700" />, text: "Where Quality meets Consistency" },
    { icon: <FiTruck className="text-amber-700" />, text: "Shipping all across worldwide" },
    { icon: <FiDroplet className="text-amber-700" />, text: "Crafting excellence in every drop" },
    { icon: <FiHeart className="text-amber-700" />, text: "Your reliable parter in fragrance manufacturing" },
    { icon: <BsGem className="text-amber-700" />, text: "100% natural & Alcohol-free fragrances" },
    { icon: <BsFlower1 className="text-amber-700" />, text: "Where Quality meets Consistency" },
    
  ];

  return (
    <section
      className={`relative mb-1 font-sans overflow-hidden transition-opacity duration-[1600ms] ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Top Marquee */}
      <div className="w-full bg-gradient-to-r from-[#FFF8E1] to-[#FFFDF7] text-amber-800 py-3 text-xs sm:text-sm border-b border-amber-200 overflow-hidden font-medium uppercase">
      <div className="marquee-track flex whitespace-nowrap items-center gap-10 animate-scroll-left">
        {marqueeItems.map((item, idx) => (
          <span key={idx} className="flex items-center gap-2 mx-8 text-[13px] sm:text-sm">
            {item.icon}
            {item.text}
          </span>
        ))}
      </div>
    </div>


      {/* Hero Slider */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        autoplay={{ delay: 9000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="heroSwiper h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-xl border border-amber-100"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div
              className="relative h-full flex items-center bg-no-repeat bg-center"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.45), rgba(0,0,0,0.15)), url(${slide.image})`,
                backgroundSize: "100%",  
              }}
            >
              <div className="relative z-10 container mx-auto md:px-12">
                <div
                  className={`max-w-xl text-white animate-fadeInUp ${
                    slide.showScroll ? "flex flex-col items-start space-y-4 mt-20" : "space-y-6"
                  }`}
                >
                  {/* ⭐ FIRST SLIDE (LEFT-ALIGNED) */}
                  {slide.showScroll && (
                    <>
                      <h1 className="font-display text-4xl md:text-6xl font-semibold drop-shadow-xl mt-25">
                        {slide.title}
                      </h1>

                      <a
                        href="#featured-products"
                        className="group inline-flex items-center gap-3 px-5 py-3
                        rounded-full backdrop-blur-md bg-white/10 border border-amber-400/40
                        shadow-[0_4px_20px_rgba(255,200,0,0.25)]
                        hover:shadow-[0_6px_28px_rgba(255,200,0,0.45)]
                        transition-all"
                      >
                        <ChevronDown className="w-6 h-6 text-amber-300 group-hover:translate-y-0.5 transition" />
                        <span className="text-amber-300 font-semibold text-lg tracking-wider">
                          Explore More
                        </span>
                      </a>
                    </>
                  )}

                  {/* ⭐ OTHER SLIDES */}
                  {!slide.showScroll && (
                    <>
                     <h1 className="font-display text-4xl md:text-6xl font-semibold drop-shadow-xl max-w-3xl  ">
                      {slide.title}
                    </h1>



                      <p className="text-base md:text-lg font-semibold text-gray-200/90 max-w-md ">
                        {slide.desc}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Bottom Fade */}
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Animations */}
      <style>
        {`
  .marquee-track {
    animation: marqueeLinear 18s linear infinite;
  }

  @keyframes marqueeLinear {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
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
