import React from "react";
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

  const isInWishlist = wishlistItems.some(
    (item) => item.product?._id === product._id
  );

  const handleAddToCart = (e) => {
    e.preventDefault();

    if (product.variants && product.variants.length > 0) {
      return;
    }

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

    if (isInWishlist) {
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
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
      <Link to={`/product/${product.slug}`} className="block">
        {/* Image Section */}
        <div className="relative bg-[#fafafa] overflow-hidden">
          <img
            src={product.images[0]?.url}
            alt={product.name}
            className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
          />

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {discount}% OFF
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm hover:bg-pink-50 transition-colors ${
              isInWishlist ? "text-pink-500" : "text-gray-600"
            }`}
          >
            <FiHeart size={20} fill={isInWishlist ? "currentColor" : "none"} />
          </button>

          {/* Quick Add to Cart */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/95 to-transparent opacity-0 group-hover:opacity-100 p-4 transition-opacity duration-300">
            <button
              onClick={handleAddToCart}
              className="w-full bg-pink-500 text-white py-2 rounded-xl font-medium hover:bg-pink-600 transition-colors flex items-center justify-center gap-2"
            >
              <FiShoppingCart />
              <span>
                {product.variants?.length > 0 ? "View Options" : "Add to Cart"}
              </span>
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <p className="text-xs text-pink-600 font-medium uppercase tracking-wide mb-1">
            {product.category?.name}
          </p>

          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-12 leading-snug">
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
