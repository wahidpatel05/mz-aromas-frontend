import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiTrash2, FiShoppingCart } from "react-icons/fi";
import {
  fetchWishlist,
  removeFromWishlist,
} from "../../store/slices/wishlistSlice";
import { addToCart } from "../../store/slices/cartSlice";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { items: wishlistItems, loading } = useSelector(
    (state) => state.wishlist
  );
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchWishlist());
  }, [dispatch, isAuthenticated]);

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCart = (item) => {
    const product = item.product;
    dispatch(
      addToCart({
        product,
        variant: product.variants?.[0] || null,
        quantity: 1,
      })
    );
  };

  // ────────────────────────────── AUTH STATES ──────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-amber-50 via-white to-amber-100 px-4 text-center">
        <div className="text-6xl mb-4">❤️</div>
        <h2 className="text-3xl font-display font-bold text-amber-900 mb-3">
          Login to View Wishlist
        </h2>
        <p className="text-gray-700 mb-8">
          Please login to see your saved products
        </p>
        <Link
          to="/login"
          className="bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
        >
          Login Now
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-600"></div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-amber-50 via-white to-amber-100 px-4 text-center">
        <div className="text-6xl mb-4">💔</div>
        <h2 className="text-3xl font-display font-bold text-amber-900 mb-3">
          Your Wishlist is Empty
        </h2>
        <p className="text-gray-700 mb-8">
          Save your favorite products for later
        </p>
        <Link
          to="/products"
          className="bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  // ────────────────────────────── WISHLIST GRID ──────────────────────────────
  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-amber-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-display font-bold text-amber-900 mb-2">
            My Wishlist
          </h1>
          <p className="text-gray-700">
            {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
          </p>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlistItems.map((item) => {
            const product = item.product;
            const displayPrice =
              product.variants?.length > 0
                ? product.variants[0].discountPrice || product.variants[0].price
                : product.discountPrice || product.price;

            const originalPrice =
              product.variants?.length > 0
                ? product.variants[0].price
                : product.price;

            const discount =
              displayPrice < originalPrice
                ? Math.round(
                    ((originalPrice - displayPrice) / originalPrice) * 100
                  )
                : 0;

            return (
              <div
                key={product._id}
                className="bg-white/90 border border-amber-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-amber-200 transition-all group"
              >
                <Link to={`/product/${product.slug}`} className="block">
                  {/* Product Image */}
                  <div className="relative bg-amber-50 overflow-hidden">
                    <img
                      src={product.images[0]?.url}
                      alt={product.name}
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />

                    {discount > 0 && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                        {discount}% OFF
                      </div>
                    )}

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemove(product._id);
                      }}
                      className="absolute top-3 right-3 bg-white/90 hover:bg-red-50 text-red-600 p-2 rounded-full shadow-md hover:shadow-lg transition-all"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="p-5">
                    <p className="text-xs text-amber-600 font-semibold uppercase tracking-wide mb-1">
                      {product.category?.name}
                    </p>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-12">
                      {product.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline space-x-2 mb-4">
                      <span className="text-2xl font-bold text-amber-800">
                        ₹{displayPrice}
                      </span>
                      {discount > 0 && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(item);
                      }}
                      className="w-full bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 text-white py-2.5 rounded-lg font-semibold flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all"
                    >
                      <FiShoppingCart size={18} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
