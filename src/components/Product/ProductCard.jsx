import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../store/slices/wishlistSlice";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  // ✅ Local state to instantly reflect wishlist change
  const [localWish, setLocalWish] = useState(false);

  // Sync with redux whenever wishlist updates
  useEffect(() => {
    const inWishlist = wishlistItems.some(
      (item) => item.product?._id === product._id
    );
    setLocalWish(inWishlist);
  }, [wishlistItems, product._id]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (product.variants && product.variants.length > 0) return;

    dispatch(
      addToCart({
        product,
        variant: null,
        quantity: 1,
      })
    );
  };

  const handleWishlist = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please login to add to wishlist");
      return;
    }

    // ✅ Instantly toggle visual feedback
    setLocalWish((prev) => !prev);

    // Trigger redux update
    if (localWish) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product._id));
    }
  };

  const displayPrice =
    product.variants?.length > 0
      ? product.variants[0].discountPrice || product.variants[0].price
      : product.discountPrice || product.price;

  const originalPrice =
    product.variants?.length > 0 ? product.variants[0].price : product.price;

  const discount =
    product.discountPrice || product.variants?.[0]?.discountPrice
      ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100)
      : 0;

  return (
    <div
      className="bg-white border border-amber-100 rounded-2xl overflow-hidden 
      shadow-sm hover:shadow-lg hover:border-amber-200 hover:shadow-amber-100/50 
      transition-all duration-500 group hover:-translate-y-2 backdrop-blur-sm"
    >
      <Link to={`/product/${product.slug}`} className="block">
        {/* 🖼️ Image Section */}
        <div className="relative bg-black overflow-hidden flex items-center justify-center rounded-t-2xl">
          <img
            src={product.images[0]?.url}
            alt={product.name}
            className="w-full h-64 object-contain bg-black p-4 transform group-hover:scale-105 transition-transform duration-700 ease-out rounded-t-2xl"
          />

          {/* 🏷️ Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
              {discount}% OFF
            </div>
          )}

          {/* 💛 Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all duration-300 
              ${
                localWish
                  ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-white animate-pulse shadow-amber-400/60"
                  : "bg-white/90 text-gray-600 hover:bg-amber-50"
              }`}
          >
            <FiHeart
              size={20}
              className={`transition-transform duration-300 ${
                localWish ? "scale-110" : "scale-100"
              }`}
              fill={localWish ? "currentColor" : "none"}
            />
          </button>

          {/* 🛒 Quick Add to Cart */}
          <div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent 
            opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 
            p-4 transition-all duration-500 ease-out"
          >
            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 
              text-white py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 
              flex items-center justify-center gap-2"
            >
              <FiShoppingCart />
              <span>
                {product.variants?.length > 0 ? "View Options" : "Add to Cart"}
              </span>
            </button>
          </div>
        </div>

        {/* 🧾 Product Info */}
        <div className="p-5">
          <p className="text-xs text-amber-600 font-semibold uppercase tracking-wide mb-1">
            {product.category?.name}
          </p>

          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-12 leading-snug group-hover:text-amber-700 transition-colors duration-300">
            {product.name}
          </h3>

          <div className="flex items-center space-x-2 mb-2">
            <FiStar className="text-yellow-400 fill-yellow-400" size={16} />
            <span className="text-sm font-medium text-gray-700">
              {product.ratings?.toFixed(1) || "0.0"}
            </span>
            <span className="text-xs text-gray-400">
              ({product.numOfReviews || 0})
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900">
              ₹{displayPrice}
            </span>
            {discount > 0 && (
              <span className="text-sm text-gray-400 line-through">
                ₹{originalPrice}
              </span>
            )}
          </div>

          {product.variants?.length > 0 && (
            <p className="text-xs text-gray-500 mt-2">
              {product.variants.length} size options available
            </p>
          )}

          {product.stock === 0 && !product.variants && (
            <p className="text-red-500 text-sm font-semibold mt-2">
              Out of Stock
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
