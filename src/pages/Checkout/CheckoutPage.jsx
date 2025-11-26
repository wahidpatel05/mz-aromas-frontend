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
  const [isRazorpayLoading, setIsRazorpayLoading] = useState(false); // ⬅ NEW LOADER STATE

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
      if (window.Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // ------------------------ RAZORPAY PAYMENT -----------------------------------
  const handleRazorpayPayment = async (orderData) => {
    setIsRazorpayLoading(true); // SHOW LOADER

    const sdkLoaded = await loadRazorpayScript();
    if (!sdkLoaded) {
      toast.error("Failed to load Razorpay SDK!");
      setIsRazorpayLoading(false);
      return;
    }

    try {
      // Create order on backend
      const { data } = await API.post("/payment/razorpay/order", {
        amount: total,
      });

      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;
      if (!razorpayKey) {
        toast.error("Razorpay key missing!");
        setIsRazorpayLoading(false);
        return;
      }

      const options = {
        key: razorpayKey,
        amount: data.order.amount,
        currency: "INR",
        name: "MZ Aromas",
        description: "Order Payment",
        order_id: data.order.id,

        handler: async function (response) {
          setIsRazorpayLoading(false); // HIDE LOADER

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
            } else {
              toast.error("Payment verification failed!");
            }
          } catch (e) {
            toast.error("Verification error, contact support.");
          }
        },

        modal: {
          ondismiss: () => {
            setIsRazorpayLoading(false); // Hide loader if user cancels
            toast.info("Payment cancelled");
          },
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

      setIsRazorpayLoading(false); // HIDE BEFORE OPENING POPUP
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      setIsRazorpayLoading(false);
      toast.error("Payment failed, try again.");
    }
  };

  // ------------------------ COD PAYMENT -----------------------------------
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
      toast.error("Order failed");
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

    const orderItems = cartItems.map((item) => {
      const price = item.variant
        ? item.variant.discountPrice || item.variant.price
        : item.product.discountPrice || item.product.price;
      return {
        name: item.product.name,
        price,
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

    if (paymentMethod === "razorpay") handleRazorpayPayment(orderData);
    else handleCODPayment(orderData);
  };

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-amber-100 min-h-screen py-10">

      {/* 🌟 FULLSCREEN LOADER */}
      {isRazorpayLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center z-[9999]">
          <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-white font-semibold tracking-wide">
            Initializing secure payment…
          </p>
        </div>
      )}

      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-display font-bold text-amber-800 mb-10 text-center">
          Checkout
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* SHIPPING ADDRESS */}
              <div className="bg-white/90 border border-amber-100 rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-amber-800 mb-6">
                  Shipping Address
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div className="md:col-span-2">
                    <label className="block text-sm mb-2">Full Address *</label>
                    <textarea
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="House No., Street, Area"
                      required
                      className="w-full border rounded-lg p-3"
                    />
                  </div>

                  {["city", "state", "pinCode", "phoneNo"].map((field) => (
                    <div key={field}>
                      <label className="block text-sm mb-2 capitalize">
                        {field}
                      </label>
                      <input
                        type="text"
                        name={field}
                        value={shippingInfo[field]}
                        onChange={handleInputChange}
                        required
                        className="w-full border rounded-lg p-3"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm mb-2">Country</label>
                    <input
                      name="country"
                      value="India"
                      disabled
                      className="w-full border rounded-lg p-3 bg-gray-100"
                    />
                  </div>

                </div>
              </div>

              {/* PAYMENT METHOD */}
              <div className="bg-white/90 border border-amber-100 rounded-2xl p-8 shadow-sm">
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
                    // {
                    //   value: "cod",
                    //   icon: <FiCheckCircle className="text-amber-700" size={22} />,
                    //   title: "Cash on Delivery",
                    //   desc: "Pay when you receive your order",
                    // },
                  ].map((method) => (
                    <label
                      key={method.value}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer ${
                        paymentMethod === method.value
                          ? "border-amber-400 bg-amber-50"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={paymentMethod === method.value}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <div className="ml-4 flex items-center gap-3">
                        {method.icon}
                        <div>
                          <div className="font-semibold">{method.title}</div>
                          <div className="text-sm">{method.desc}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT SIDE (ORDER SUMMARY) */}
            <div className="lg:col-span-1">
              <div className="bg-white/90 border border-amber-100 rounded-2xl p-8 shadow-sm sticky top-24">

                <h3 className="text-xl font-semibold mb-6">Order Summary</h3>

                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => {
                    const price = item.variant
                      ? item.variant.discountPrice || item.variant.price
                      : item.product.discountPrice || item.product.price;

                    return (
                      <div className="flex gap-3 items-center" key={item.product._id}>
                        <img
                          src={item.product.images[0]?.url}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold">{item.product.name}</h4>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs">Qty: {item.quantity}</span>
                            <span className="font-semibold text-amber-700">
                              ₹{price * item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (18%)</span>
                    <span>₹{tax}</span>
                  </div>

                  <div className="border-t pt-3 flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-amber-700">₹{total}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-400 to-yellow-600 text-white py-4 rounded-lg font-semibold mt-6"
                >
                  {paymentMethod === "razorpay" ? "Pay Now" : "Place Order"}
                </button>

              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
