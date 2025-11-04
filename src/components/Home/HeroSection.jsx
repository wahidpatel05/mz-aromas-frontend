import React from "react";
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
  const slides = [
    {
      title: "Pure Natural Attars",
      desc: "Experience the authentic essence of traditional Indian fragrances.",
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
      desc: "Timeless aromas, perfectly packed for your loved ones.",
      btn: "View Gift Sets",
      link: "/products?category=gift-sets",
      image: hero4,
    },
  ];

  return (
    <section className="relative mb-20">
      {/* 🌸 Marquee Banner */}
      <div className="w-full bg-linear-to-r from-primary-700 via-primary-600 to-primary-700 text-black py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-sm sm:text-base font-medium tracking-wide">
          <span className="mx-8">
            🚚 Free Delivery on Orders Above ₹999
          </span>
          <span className="mx-8">
            🌿 100% Natural & Alcohol-Free Fragrances
          </span>
          <span className="mx-8">
            🕯️ Handcrafted with Love – Only at MZ Aromas
          </span>
          <span className="mx-8">
            💎 Authentic. Long-Lasting. Luxurious.
          </span>
          <span className="mx-8">
            🌸 Discover the Essence of True Indian Perfumery
          </span>
        </div>
      </div>

      {/* 🌿 Hero Slider */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl"
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
              {/* ✨ Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-900/40 via-black/30 to-transparent"></div>

              {/* 🌸 Content */}
              <div className="relative z-10 container mx-auto px-6 md:px-12">
                <div
                  className="max-w-xl space-y-6 text-white animate-fadeInUp"
                  style={{ animationDelay: "0.3s" }}
                >
                  <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]">
                    {slide.title}
                  </h1>
                  <p className="text-base md:text-lg text-gray-200/90 max-w-md leading-relaxed">
                    {slide.desc}
                  </p>

                  <Link
                    to={slide.link}
                    className="inline-block bg-gradient-to-r from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800 text-white px-8 py-3 rounded-full font-semibold shadow-lg shadow-primary-800/30 hover:shadow-primary-700/50 transition-all duration-300 hover:scale-[1.03]"
                  >
                    {slide.btn}
                  </Link>
                </div>
              </div>

              {/* Soft Light Overlay */}
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
