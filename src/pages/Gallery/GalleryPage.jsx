import React, { useEffect, useState } from "react";
import { FiDroplet, FiFeather, FiStar, FiArrowRight } from "react-icons/fi";
import mz from "../../assets/mz.jpeg";

const GalleryPage = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 pt-24 pb-20 transition-all duration-[1200ms] ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Header */}
      <section className="text-center mb-16 px-6">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-amber-800 mb-4">
          About{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-600">
            MZ Aromas
          </span>
        </h1>
        <p className="max-w-3xl mx-auto text-gray-700 text-lg leading-relaxed">
          Crafting fragrances that tell stories. Bridging tradition and innovation, MZ Aromas brings you globally-inspired perfume oils, attars, agarbatti, and industrial fragrances rooted in purity and excellence.
        </p>
      </section>

      {/* Our Story Section */}
      <section className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <div className="space-y-6">
          <h2 className="text-3xl font-display font-bold text-amber-800">
            Our Journey
          </h2>
          <p className="text-gray-700 leading-relaxed">
            MZ Aromas began with a simple mission to redefine luxury through authentic, long-lasting fragrances*.  
            What started as a small fragrance house has grown into a globally recognized name in perfume oils, industrial formulations, incense products, and more.
          </p>
          <p className="text-gray-700 leading-relaxed">
            With decades of experience, our artisans blend ancient perfumery techniques with modern innovations, ensuring every drop reflects purity, consistency, and elegance.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img
            src={mz}
            alt="MZ Aromas Story"
            className="w-full h-[350px] object-cover"
          />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-r from-amber-100 via-white to-amber-100 border-y border-amber-200">
        <h2 className="text-3xl font-display text-center font-bold text-amber-800 mb-12">
          Why Choose MZ Aromas?
        </h2>

        <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {[ 
            {
              icon: <FiDroplet size={38} className="text-amber-700" />,
              title: "Premium Ingredients",
              desc: "Handpicked raw materials sourced from trusted distillers and global suppliers.",
            },
            {
              icon: <FiFeather size={38} className="text-amber-700" />,
              title: "Authentic Craftsmanship",
              desc: "Traditional attar-making blended with modern extraction techniques.",
            },
            {
              icon: <FiStar size={38} className="text-amber-700" />,
              title: "ISO Certified Quality",
              desc: "Every product undergoes thorough quality checks for purity and consistency.",
            },
            {
              icon: <FiArrowRight size={38} className="text-amber-700" />,
              title: "Global Reach",
              desc: "Supplying fragrances and incense products across more than 20+ countries.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl border border-amber-100 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all text-center"
            >
              <div className="flex justify-center mb-5">{item.icon}</div>
              <h3 className="text-xl font-display font-semibold text-amber-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Mission */}
      <section className="container mx-auto px-6 mt-20 text-center max-w-3xl">
        <h2 className="text-3xl font-display font-bold text-amber-800 mb-6">
          Our Mission
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          To bring the essence of nature, luxury, and craftsmanship into every fragrance.  
          We aim to make premium aromatic experiences accessible worldwide — without compromising on quality, authenticity, or purity.
        </p>
      </section>

      {/* Animation */}
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
      `}</style>
    </div>
  );
};

export default GalleryPage;
