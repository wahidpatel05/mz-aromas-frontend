import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiCreditCard, FiCheckCircle } from "react-icons/fi";
import { createOrder } from "../../store/slices/orderSlice";
import { clearCart } from "../../store/slices/cartSlice";
import API from "../../config/api";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "India",
    pinCode: "",
    phoneNo: "",
  });

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

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async (orderData) => {
    const res = await loadRazorpayScript();

    if (!res) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    try {
      const { data } = await API.post("/payment/razorpay/order", {
        amount: total,
      });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: data.order.amount,
        currency: "INR",
        name: "MZ Aromas",
        description: "Order Payment",
        order_id: data.order.id,
        handler: async function (response) {
          try {
            const verifyResponse = await API.post("/payment/razorpay/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyResponse.data.success) {
              const finalOrderData = {
                ...orderData,
                paymentInfo: {
                  id: response.razorpay_payment_id,
                  status: "Paid",
                  type: "Razorpay",
                },
              };

              const orderResult = await dispatch(createOrder(finalOrderData));
              if (orderResult.payload) {
                dispatch(clearCart());
                navigate("/order-success", {
                  state: { orderId: orderResult.payload.order._id },
                });
              }
            }
          } catch {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: shippingInfo.phoneNo,
        },
        theme: {
          color: "#b9814f",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch {
      toast.error("Payment failed");
    }
  };

  const handleCODPayment = async (orderData) => {
    try {
      const { data } = await API.post("/payment/cod");
      const finalOrderData = {
        ...orderData,
        paymentInfo: {
          id: data.paymentInfo.id,
          status: "COD",
          type: "COD",
        },
      };
      const orderResult = await dispatch(createOrder(finalOrderData));
      if (orderResult.payload) {
        dispatch(clearCart());
        navigate("/order-success", {
          state: { orderId: orderResult.payload.order._id },
        });
      }
    } catch {
      toast.error("Order placement failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.pinCode ||
      !shippingInfo.phoneNo
    ) {
      toast.error("Please fill all shipping details");
      return;
    }
    if (shippingInfo.phoneNo.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    const orderItems = cartItems.map((item) => {
      const price = item.variant
        ? item.variant.discountPrice || item.variant.price
        : item.product.discountPrice || item.product.price;
      return {
        name: item.product.name,
        price: price,
        quantity: item.quantity,
        image: item.product.images[0]?.url,
        product: item.product._id,
        variant: item.variant
          ? { size: item.variant.size, price: item.variant.price }
          : undefined,
      };
    });

    const orderData = {
      shippingInfo,
      orderItems,
      itemsPrice: subtotal,
      taxPrice: tax,
      shippingPrice: shipping,
      totalPrice: total,
    };

    if (paymentMethod === "razorpay") await handleRazorpayPayment(orderData);
    else await handleCODPayment(orderData);
  };

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-amber-100 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-display font-bold text-amber-800 mb-10 text-center">
          Checkout
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* 🏠 Shipping & Payment Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping */}
              <div className="bg-white/90 border border-amber-100 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:border-amber-200 transition-all duration-500">
                <h2 className="text-2xl font-semibold text-amber-800 mb-6">
                  Shipping Address
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Address *
                    </label>
                    <textarea
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="House No., Street, Area"
                      required
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all"
                    />
                  </div>

                  {["city", "state", "pinCode", "phoneNo"].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                        {field === "pinCode" ? "PIN Code *" : field === "phoneNo" ? "Phone Number *" : `${field} *`}
                      </label>
                      <input
                        type={field === "phoneNo" || field === "pinCode" ? "tel" : "text"}
                        name={field}
                        value={shippingInfo[field]}
                        onChange={handleInputChange}
                        placeholder={
                          field === "pinCode"
                            ? "6-digit code"
                            : field === "phoneNo"
                            ? "10-digit number"
                            : `Enter ${field}`
                        }
                        required
                        maxLength={field === "pinCode" ? 6 : field === "phoneNo" ? 10 : undefined}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={shippingInfo.country}
                      disabled
                      className="w-full border border-gray-200 bg-gray-100 rounded-lg p-3 text-gray-600"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white/90 border border-amber-100 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:border-amber-200 transition-all duration-500">
                <h2 className="text-2xl font-semibold text-amber-800 mb-6">
                  Payment Method
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      value: "razorpay",
                      icon: <FiCreditCard className="text-amber-700" size={22} />,
                      title: "Credit/Debit Card, UPI, Net Banking",
                      desc: "Pay securely via Razorpay",
                    },
                    {
                      value: "cod",
                      icon: <FiCheckCircle className="text-amber-700" size={22} />,
                      title: "Cash on Delivery",
                      desc: "Pay when you receive your order",
                    },
                  ].map((method) => (
                    <label
                      key={method.value}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                        paymentMethod === method.value
                          ? "border-amber-400 bg-amber-50"
                          : "border-gray-200 hover:border-amber-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={paymentMethod === method.value}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-amber-600 accent-amber-600"
                      />
                      <div className="ml-4 flex items-center gap-3">
                        {method.icon}
                        <div>
                          <div className="font-semibold text-gray-900">
                            {method.title}
                          </div>
                          <div className="text-sm text-gray-600">
                            {method.desc}
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* 🧾 Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/90 border border-amber-100 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:border-amber-200 transition-all duration-500 sticky top-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => {
                    const price = item.variant
                      ? item.variant.discountPrice || item.variant.price
                      : item.product.discountPrice || item.product.price;
                    return (
                      <div
                        key={`${item.product._id}-${item.variant?.size}`}
                        className="flex gap-3 items-center"
                      >
                        <img
                          src={item.product.images[0]?.url}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg border border-amber-50"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">
                            {item.product.name}
                          </h4>
                          {item.variant && (
                            <p className="text-xs text-gray-600">
                              {item.variant.size}
                            </p>
                          )}
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-gray-600">
                              Qty: {item.quantity}
                            </span>
                            <span className="text-sm font-semibold text-amber-700">
                              ₹{price * item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-3 mb-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `₹${shipping}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax (18%)</span>
                    <span className="font-semibold">₹{tax}</span>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">
                        Total
                      </span>
                      <span className="text-2xl font-bold text-amber-700">
                        ₹{total}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 
                  text-white py-4 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 text-lg"
                >
                  {paymentMethod === "razorpay" ? "Pay Now" : "Place Order"}
                </button>

                <p className="text-xs text-gray-600 text-center mt-4">
                  By placing this order, you agree to our{" "}
                  <span className="text-amber-700 hover:underline cursor-pointer">
                    Terms & Conditions
                  </span>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
