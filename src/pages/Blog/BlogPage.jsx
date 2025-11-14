import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiClock, FiUser, FiArrowRight } from "react-icons/fi";

const BlogPage = () => {
  const [visible, setVisible] = useState(false);

  // Animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Sample blog data (replace with backend later)
  const blogs = [
    {
      id: 1,
      title: "The Art of Perfumery: How MZ Aromas Crafts Its Signature Scents",
      author: "MZ Aromas Team",
      date: "November 2025",
      image:
        "https://images.unsplash.com/photo-1600180758890-6a589b56b1d5?auto=format&fit=crop&w=800&q=80",
      description:
        "Explore the delicate process behind our fragrance creation — from sourcing pure essential oils to blending aromatic notes that evoke luxury and warmth.",
    },
    {
      id: 2,
      title: "5 Attars You Must Try: A Guide to Traditional Fragrance Blends",
      author: "Wahid Patel",
      date: "October 2025",
      image:
        "https://images.unsplash.com/photo-1600180759215-2b66e6bfb3db?auto=format&fit=crop&w=800&q=80",
      description:
        "Discover our top attar recommendations that combine natural ingredients with timeless Indian craftsmanship for a truly mesmerizing aroma.",
    },
    {
      id: 3,
      title: "Why Choose Alcohol-Free Perfume Oils?",
      author: "Muzzamil Hingora ",
      date: "September 2025",
      image:
        "https://images.unsplash.com/photo-1600180758220-d7a46c764d60?auto=format&fit=crop&w=800&q=80",
      description:
        "Understand why alcohol-free perfumes are better for sensitive skin, long-lasting fragrance, and an authentic scent experience.",
    },
  ];

  return (
    <section
      className={`relative py-24 bg-gradient-to-b from-amber-50 via-white to-amber-50 overflow-hidden transition-all duration-[1200ms] ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.05] bg-[url('/pattern.svg')] bg-cover bg-center mix-blend-multiply"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4 text-amber-800">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600">Blog</span>
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
            Discover fragrance tips, behind-the-scenes insights, and the aromatic world of MZ Aromas.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog, index) => (
            <div
              key={blog.id}
              className="group bg-white rounded-2xl border border-amber-100 shadow-[0_4px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_25px_rgba(255,193,7,0.15)] overflow-hidden hover:-translate-y-2 transition-all duration-700"
              style={{
                animation: "fadeUp 0.9s ease forwards",
                animationDelay: `${index * 0.2 + 0.3}s`,
                opacity: 0,
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors">
                  {blog.title}
                </h3>
                <div className="flex items-center text-gray-500 text-sm mb-4 gap-4">
                  <span className="flex items-center gap-1">
                    <FiUser className="text-amber-600" /> {blog.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock className="text-amber-600" /> {blog.date}
                  </span>
                </div>
                <p className="text-gray-700 text-[15px] leading-relaxed mb-5">
                  {blog.description}
                </p>
                <Link
                  to={`/blog/${blog.id}`}
                  className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:gap-3 transition-all"
                >
                  Read More <FiArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(25px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default BlogPage;
