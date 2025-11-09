import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FiHeart,
  FiShoppingCart,
  FiShare2,
  FiStar,
  FiMinus,
  FiPlus,
  FiTruck,
  FiShield,
} from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import {
  fetchProductBySlug,
  fetchRelatedProducts,
} from "../../store/slices/productSlice";
import { addToCart } from "../../store/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../store/slices/wishlistSlice";
import ProductCard from "../../components/Product/ProductCard";
import { toast } from "react-toastify";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const {
    currentProduct: product,
    relatedProducts,
    loading,
  } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchProductBySlug(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (product) {
      if (product.variants && product.variants.length > 0) {
        setSelectedVariant(product.variants[0]);
      }
      dispatch(fetchRelatedProducts(product._id));
    }
  }, [product, dispatch]);

  if (loading || !product) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-600"></div>
      </div>
    );
  }

  const isInWishlist = wishlistItems.some(
    (item) => item.product?._id === product._id
  );

  const displayPrice = selectedVariant
    ? selectedVariant.discountPrice || selectedVariant.price
    : product.discountPrice || product.price;

  const originalPrice = selectedVariant ? selectedVariant.price : product.price;

  const discount =
    displayPrice < originalPrice
      ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100)
      : 0;

  const handleAddToCart = () => {
    if (selectedVariant && selectedVariant.stock === 0) {
      toast.error("Selected variant is out of stock");
      return;
    }

    dispatch(
      addToCart({
        product,
        variant: selectedVariant,
        quantity,
      })
    );
  };

  const handleWishlist = () => {
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

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.shortDescription,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-amber-100">
      {/* Breadcrumb */}
      <div className="bg-white/80 border-b border-amber-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-amber-700 font-medium">
              Home
            </Link>
            <span>/</span>
            <Link to="/products" className="hover:text-amber-700 font-medium">
              Products
            </Link>
            <span>/</span>
            <Link
              to={`/products?category=${product.category?.slug}`}
              className="hover:text-amber-700 font-medium"
            >
              {product.category?.name}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="bg-white/90 border border-amber-100 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-500">
              <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mb-4 rounded-xl overflow-hidden"
              >
                {product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image.url}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-[500px] object-cover rounded-xl"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Thumbnails */}
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
              >
                {product.images.map((image, index) => (
                  <SwiperSlide key={index} className="cursor-pointer">
                    <img
                      src={image.url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-24 object-cover rounded-xl border-2 border-transparent hover:border-amber-500 transition-all"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Wishlist & Share */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleWishlist}
                className={`flex-1 py-3 rounded-xl font-semibold border-2 transition-all ${
                  isInWishlist
                    ? "bg-red-50 border-red-500 text-red-600"
                    : "bg-white border-gray-300 hover:border-amber-600 text-gray-700"
                }`}
              >
                <FiHeart
                  className="inline mr-2"
                  fill={isInWishlist ? "currentColor" : "none"}
                />
                {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
              </button>

              <button
                onClick={handleShare}
                className="px-6 py-3 rounded-xl font-semibold border-2 border-gray-300 text-gray-700 hover:border-amber-600 transition-all"
              >
                <FiShare2 className="inline" />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="bg-white/90 border border-amber-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-500">
              {/* Category */}
              <Link
                to={`/products?category=${product.category?.slug}`}
                className="inline-block text-sm text-amber-700 font-semibold uppercase tracking-widest mb-2"
              >
                {product.category?.name}
              </Link>

              {/* Name */}
              <h1 className="text-4xl font-display font-bold text-amber-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      size={20}
                      className={
                        i < Math.floor(product.ratings || 0)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.ratings?.toFixed(1)} ({product.numOfReviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline space-x-3 mb-1">
                  <span className="text-4xl font-bold text-amber-800">
                    ₹{displayPrice}
                  </span>
                  {discount > 0 && (
                    <>
                      <span className="text-lg text-gray-500 line-through">
                        ₹{originalPrice}
                      </span>
                      <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {discount}% OFF
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  Inclusive of all taxes
                </p>
              </div>

              {/* Description */}
              {product.shortDescription && (
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {product.shortDescription}
                </p>
              )}

              {/* Variants */}
              {product.variants?.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Select Size:
                  </h3>
                  <div className="grid grid-cols-4 gap-3">
                    {product.variants.map((variant) => (
                      <button
                        key={variant._id}
                        onClick={() => setSelectedVariant(variant)}
                        disabled={variant.stock === 0}
                        className={`p-3 rounded-lg border-2 font-semibold transition-all ${
                          selectedVariant?._id === variant._id
                            ? "border-amber-600 bg-amber-50 text-amber-800"
                            : variant.stock === 0
                            ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "border-gray-300 hover:border-amber-600"
                        }`}
                      >
                        <div className="text-sm">{variant.size}</div>
                        <div className="text-xs text-gray-600 mt-1">
                          ₹{variant.discountPrice || variant.price}
                        </div>
                        {variant.stock === 0 && (
                          <div className="text-xs text-red-600 mt-1">
                            Out of Stock
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Quantity:</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border-2 border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange("decrement")}
                      className="px-4 py-2 hover:bg-amber-50"
                      disabled={quantity <= 1}
                    >
                      <FiMinus />
                    </button>
                    <span className="px-6 py-2 font-semibold">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange("increment")}
                      className="px-4 py-2 hover:bg-amber-50"
                    >
                      <FiPlus />
                    </button>
                  </div>
                  {selectedVariant && (
                    <span className="text-sm text-gray-600">
                      {selectedVariant.stock} units available
                    </span>
                  )}
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={selectedVariant?.stock === 0}
                className="w-full bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 text-white py-4 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <FiShoppingCart size={24} />
                <span>Add to Cart</span>
              </button>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center space-x-3 bg-amber-50 p-4 rounded-lg">
                  <FiTruck className="text-amber-700" size={24} />
                  <div className="text-sm">
                    <div className="font-semibold text-amber-800">
                      Free Delivery
                    </div>
                    <div className="text-gray-600 text-xs">
                      On orders above ₹999
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-amber-50 p-4 rounded-lg">
                  <FiShield className="text-amber-700" size={24} />
                  <div className="text-sm">
                    <div className="font-semibold text-amber-800">
                      Secure Payment
                    </div>
                    <div className="text-gray-600 text-xs">
                      100% Protected
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16 bg-white/90 border border-amber-100 rounded-2xl p-8 shadow-sm">
          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-8">
              {["description", "ingredients", "howToUse", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 font-semibold transition-all capitalize ${
                    activeTab === tab
                      ? "border-b-2 border-amber-600 text-amber-700"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab === "reviews"
                    ? `Reviews (${product.numOfReviews})`
                    : tab}
                </button>
              ))}
            </div>
          </div>

          <div className="text-gray-700 leading-relaxed">
            {activeTab === "description" && (
              <p>{product.description || "No description available."}</p>
            )}

            {activeTab === "ingredients" && (
              product.ingredients?.length ? (
                <ul className="list-disc list-inside space-y-2">
                  {product.ingredients.map((i, idx) => (
                    <li key={idx}>{i}</li>
                  ))}
                </ul>
              ) : (
                <p>Ingredient information not available.</p>
              )
            )}

            {activeTab === "howToUse" && (
              <p>{product.howToUse || "Usage instructions not available."}</p>
            )}

            {activeTab === "reviews" && (
              <div>
                {product.reviews?.length ? (
                  <div className="space-y-6">
                    {product.reviews.map((r) => (
                      <div
                        key={r._id}
                        className="border-b border-gray-200 pb-6 last:border-0"
                      >
                        <div className="flex justify-between mb-2">
                          <div>
                            <div className="font-semibold text-gray-900">
                              {r.name}
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <FiStar
                                  key={i}
                                  size={16}
                                  className={
                                    i < r.rating
                                      ? "text-yellow-500 fill-yellow-500"
                                      : "text-gray-300"
                                  }
                                />
                              ))}
                            </div>
                          </div>
                          <div className="text-xs text-gray-600">
                            {new Date(r.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <p>{r.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No reviews yet. Be the first to review!</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-display font-bold text-amber-900 mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
