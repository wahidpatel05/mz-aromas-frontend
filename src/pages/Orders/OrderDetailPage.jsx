import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiPackage,
  FiMapPin,
  FiCreditCard,
  FiDownload,
} from "react-icons/fi";
import API from "../../config/api";
import { toast } from "react-toastify";

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      const { data } = await API.get(`/order/${id}`);
      setOrder(data.order);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch order details");
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-amber-50 text-amber-700 border border-amber-200";
      case "Shipped":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "Delivered":
        return "bg-green-50 text-green-700 border border-green-200";
      case "Cancelled":
        return "bg-red-50 text-red-700 border border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  const getStatusSteps = () => {
    const steps = ["Processing", "Shipped", "Delivered"];
    const currentIndex = steps.indexOf(order?.orderStatus);
    return steps.map((step, index) => ({
      name: step,
      completed: index <= currentIndex,
      current: index === currentIndex,
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 bg-gradient-to-br from-amber-50 via-white to-amber-100">
        Order not found.
      </div>
    );
  }

  const statusSteps = getStatusSteps();

  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-amber-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate("/orders")}
          className="flex items-center gap-2 text-gray-700 hover:text-amber-700 mb-8 font-medium transition-all"
        >
          <FiArrowLeft size={18} />
          Back to Orders
        </button>

        {/* Header Card */}
        <div className="bg-white border border-amber-100 rounded-2xl shadow-sm hover:shadow-lg transition-all p-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold text-amber-900 mb-1">
                Order #{order._id.slice(-8)}
              </h1>
              <p className="text-gray-600 text-sm">
                Placed on{" "}
                {new Date(order.createdAt).toLocaleString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <span
              className={`mt-4 md:mt-0 px-5 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                order.orderStatus
              )}`}
            >
              {order.orderStatus}
            </span>
          </div>

         {/* Progress Tracker */}
{order.orderStatus !== "Cancelled" && (
  <div className="mt-10 flex flex-col items-center justify-center">
    <div className="relative flex items-center justify-between w-full max-w-2xl mx-auto">

      {/* Background Line (full width between circles) */}
      <div className="absolute top-1/2 left-0 right-0 h-[4px] bg-gray-200 rounded-full transform -translate-y-1/2 z-0" />

      {/* Progress Fill Line (animated fill between circles) */}
      <div
        className="absolute top-1/2 left-0 h-[4px] bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full transform -translate-y-1/2 transition-all duration-700 ease-out z-0"
        style={{
          width: `${
            order.orderStatus === "Processing"
              ? "16%"
              : order.orderStatus === "Shipped"
              ? "50%"
              : order.orderStatus === "Delivered"
              ? "100%"
              : "0%"
          }`,
        }}
      />

      {/* Steps */}
      {statusSteps.map((step, index) => (
        <div
          key={step.name}
          className="flex flex-col items-center flex-1 relative z-10"
        >
          {/* Circle (sits on top of line) */}
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-full border-2 text-base font-semibold transition-all duration-300 ${
              step.completed
                ? "bg-linear-to-b from-amber-400 to-yellow-600 text-white border-transparent shadow-md shadow-amber-200"
                : "bg-white text-gray-400 border-gray-300"
            }`}
          >
            {step.completed ? "✓" : index + 1}
          </div>

          {/* Label */}
          <p
            className={` text-sm font-medium ${
              step.completed ? "text-amber-700" : "text-gray-500"
            }`}
          >
            {step.name}
          </p>
        </div>
      ))}
    </div>
  </div>
)}

        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-10">
            {/* Items */}
            <div className="bg-white border border-amber-100 rounded-2xl shadow-sm hover:shadow-lg transition-all p-8">
              <h2 className="text-2xl font-semibold text-amber-900 mb-6 flex items-center gap-2">
                <FiPackage /> Order Items
              </h2>

              <div className="space-y-5">
                {order.orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-none"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl border border-amber-50 shadow-sm"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      {item.variant && (
                        <p className="text-sm text-gray-600">
                          Size: {item.variant.size}
                        </p>
                      )}
                      <div className="flex justify-between mt-2 text-sm">
                        <span className="text-gray-600">
                          Qty: {item.quantity}
                        </span>
                        <span className="font-semibold text-amber-800">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-white border border-amber-100 rounded-2xl shadow-sm hover:shadow-lg transition-all p-8">
              <h2 className="text-2xl font-semibold text-amber-900 mb-6 flex items-center gap-2">
                <FiMapPin /> Shipping Address
              </h2>
              <div className="text-gray-700 space-y-1">
                <p>{order.shippingInfo.address}</p>
                <p>
                  {order.shippingInfo.city}, {order.shippingInfo.state} -{" "}
                  {order.shippingInfo.pinCode}
                </p>
                <p>{order.shippingInfo.country}</p>
                <p className="mt-2 font-medium text-gray-800">
                  📞 {order.shippingInfo.phoneNo}
                </p>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white border border-amber-100 rounded-2xl shadow-sm hover:shadow-lg transition-all p-8">
              <h2 className="text-2xl font-semibold text-amber-900 mb-6 flex items-center gap-2">
                <FiCreditCard /> Payment Information
              </h2>
              <div className="text-gray-700 space-y-3">
                <div className="flex justify-between">
                  <span>Method:</span>
                  <span className="font-semibold text-gray-900">
                    {order.paymentInfo.type}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.paymentInfo.status === "Paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.paymentInfo.status}
                  </span>
                </div>
                {order.paymentInfo.id && (
                  <div className="flex justify-between">
                    <span>Transaction ID:</span>
                    <span className="font-mono text-sm text-gray-900">
                      {order.paymentInfo.id}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-amber-100 rounded-2xl shadow-sm hover:shadow-lg transition-all p-8 sticky top-24">
              <h2 className="text-xl font-semibold text-amber-900 mb-6">
                Order Summary
              </h2>
              <div className="space-y-3 mb-6 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{order.itemsPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {order.shippingPrice === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${order.shippingPrice}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="font-semibold">₹{order.taxPrice}</span>
                </div>

                <div className="border-t pt-4 mt-4 flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-amber-800">
                    ₹{order.totalPrice}
                  </span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <FiDownload />
                Download Invoice
              </button>

              {order.orderStatus === "Delivered" && (
                <button className="w-full mt-3 bg-amber-100 text-amber-800 hover:bg-amber-200 rounded-lg py-3 font-semibold transition-all">
                  Write a Review
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
