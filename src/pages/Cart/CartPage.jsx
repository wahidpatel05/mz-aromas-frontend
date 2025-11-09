import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../store/slices/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleQuantityChange = (item, type) => {
    const newQuantity =
      type === "increment" ? item.quantity + 1 : item.quantity - 1;

    if (newQuantity > 0) {
      dispatch(
        updateQuantity({
          productId: item.product._id,
          variantSize: item.variant?.size,
          quantity: newQuantity,
        })
      );
    }
  };

  const handleRemove = (item) => {
    dispatch(
      removeFromCart({
        productId: item.product._id,
        variantSize: item.variant?.size,
      })
    );
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.variant
        ? item.variant.discountPrice || item.variant.price
        : item.product.discountPrice || item.product.price;
      return total + price * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal >= 999 ? 0 : 50;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/checkout" } });
    } else {
      navigate("/checkout");
    }
  };

  // 🛍️ Empty Cart UI
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="text-7xl mb-4">🛒</div>
        <h2 className="text-3xl font-display font-bold text-amber-800 mb-2">
          Your Cart is Empty
        </h2>
        <p className="text-gray-600 mb-8">
          Looks like you haven’t added anything yet.
        </p>
        <Link
          to="/products"
          className="bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 
          text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // 🛒 Cart Content
  return (
    <div className="bg-gradient-to-b from-amber-50 via-white to-amber-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-display font-bold text-amber-800 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            You have {cartItems.length} {cartItems.length > 1 ? "items" : "item"} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => {
              const price = item.variant
                ? item.variant.discountPrice || item.variant.price
                : item.product.discountPrice || item.product.price;
              const originalPrice = item.variant
                ? item.variant.price
                : item.product.price;

              return (
                <div
                  key={`${item.product._id}-${item.variant?.size || "default"}`}
                  className="bg-white/90 border border-amber-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-amber-200 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Product Image */}
                    <Link
                      to={`/product/${item.product.slug}`}
                      className="flex-shrink-0"
                    >
                      <img
                        src={item.product.images[0]?.url}
                        alt={item.product.name}
                        className="w-32 h-32 object-cover rounded-xl border border-amber-50 shadow-sm hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <Link
                            to={`/product/${item.product.slug}`}
                            className="font-semibold text-gray-900 hover:text-amber-700 transition-colors text-lg"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-gray-600 mt-1">
                            {item.product.category?.name}
                          </p>
                          {item.variant && (
                            <p className="text-sm text-gray-600 mt-1">
                              Size:{" "}
                              <span className="font-semibold text-amber-700">
                                {item.variant.size}
                              </span>
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleRemove(item)}
                          className="text-red-500 hover:text-red-600 transition"
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </div>

                      {/* Price & Quantity */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4">
                        <div className="flex items-baseline space-x-2">
                          <span className="text-2xl font-bold text-amber-800">
                            ₹{price}
                          </span>
                          {price < originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              ₹{originalPrice}
                            </span>
                          )}
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                          <div className="flex items-center border border-amber-200 rounded-lg shadow-sm overflow-hidden">
                            <button
                              onClick={() =>
                                handleQuantityChange(item, "decrement")
                              }
                              className="px-3 py-2 hover:bg-amber-50 transition disabled:opacity-40"
                              disabled={item.quantity <= 1}
                            >
                              <FiMinus size={16} />
                            </button>
                            <span className="px-4 py-2 font-semibold text-gray-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(item, "increment")
                              }
                              className="px-3 py-2 hover:bg-amber-50 transition"
                            >
                              <FiPlus size={16} />
                            </button>
                          </div>
                          <span className="font-semibold text-gray-900">
                            ₹{price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Clear Cart */}
            <button
              onClick={() => dispatch(clearCart())}
              className="text-red-500 hover:text-red-600 font-semibold transition-all mt-2"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 border border-amber-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-amber-200 transition-all duration-500 sticky top-24">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h3>

              <div className="space-y-4 mb-6 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (GST 18%)</span>
                  <span className="font-semibold">₹{tax}</span>
                </div>

                {subtotal < 999 && (
                  <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                    <p className="text-sm text-amber-800">
                      Add ₹{999 - subtotal} more for <b>FREE Shipping</b> 🚚
                    </p>
                  </div>
                )}

                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-amber-700">
                    ₹{total}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 
                text-white py-3.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 
                flex items-center justify-center gap-2 text-lg"
              >
                <FiShoppingBag />
                <span>Proceed to Checkout</span>
              </button>

              <Link
                to="/products"
                className="block text-center text-amber-700 hover:text-amber-800 font-semibold mt-4 transition-colors"
              >
                Continue Shopping
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <span className="text-green-600">✓</span>
                  <span>100% Secure Payments</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-600">✓</span>
                  <span>Easy Returns & Refunds</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-600">✓</span>
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
