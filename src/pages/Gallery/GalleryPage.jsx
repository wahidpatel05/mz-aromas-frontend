import React, { useEffect, useState } from "react";

const galleryImages = [
  { id: 1, url: "/gallery/img1.jpg", title: "Premium Attar Collection" },
  { id: 2, url: "/gallery/img2.jpg", title: "Agarbatti Manufacturing" },
  { id: 3, url: "/gallery/img3.jpg", title: "Perfume Oil Extraction" },
  { id: 4, url: "/gallery/img4.jpg", title: "Gift Set Packaging" },
  { id: 5, url: "/gallery/img5.jpg", title: "Raw Material Selection" },
  { id: 6, url: "/gallery/img6.jpg", title: "MZ Aromas Showroom" },
  { id: 7, url: "/gallery/img7.jpg", title: "Fragrance Testing Lab" },
  { id: 8, url: "/gallery/img8.jpg", title: "Attar Roll-On Production" },
];

const GalleryPage = () => {
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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
      {/* Heading */}
      <div className="text-center mb-16 px-6">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-amber-800">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-600">Gallery</span>
        </h1>
        <p className="max-w-2xl mx-auto text-gray-700 mt-4 text-lg">
          A glimpse into the world of authentic fragrances, craftsmanship, and luxury at MZ Aromas.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
        {galleryImages.map((img, index) => (
          <div
            key={img.id}
            style={{
              animation: "fadeUp 0.9s ease forwards",
              animationDelay: `${(index + 1) * 0.15}s`,
            }}
            className="opacity-0 group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
            onClick={() => setSelectedImage(img)}
          >
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-500">
              {img.title}
            </p>
          </div>
        ))}
      </div>

      {/* Full Screen Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[2000] animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-[90%]">
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full rounded-2xl shadow-2xl"
            />
            <p className="text-center text-white mt-4 text-lg font-semibold">
              {selectedImage.title}
            </p>
          </div>
        </div>
      )}

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
