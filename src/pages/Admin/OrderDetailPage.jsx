// src/pages/Admin/OrderDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiPackage,
  FiMapPin,
  FiCreditCard,
} from "react-icons/fi";
import API from "../../config/api";
import { toast } from "react-toastify";

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // ⭐ Tracking ID state
  const [courierName, setCourierName] = useState("");
  const [trackingId, setTrackingId] = useState("");

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      const { data } = await API.get(`/order/${id}`);
      setOrder(data.order);

      // ⭐ Set default tracking ID when order loads
      setCourierName(data.order?.courierName || "");
      setTrackingId(data.order?.trackingId || "");

      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch order details");
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (status) => {
    try {
      await API.put(`/admin/order/${id}`, { status });
      toast.success("Order status updated");
      fetchOrderDetails();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDeleteOrder = async () => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await API.delete(`/admin/order/${id}`);
        toast.success("Order deleted successfully");
        navigate("/admin/orders");
      } catch (error) {
        toast.error("Failed to delete order");
      }
    }
  };

  // ⭐ Update Tracking ID Handler
  const handleTrackingIdUpdate = async () => {
    try {
      await API.put(`/admin/order/${id}/tracking`, {
        courierName,
        trackingId,
      });

      toast.success("Tracking details updated");
      fetchOrderDetails();
    } catch (error) {
      toast.error("Failed to update tracking details");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-16 text-gray-600">Order not found</div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-amber-100 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => navigate("/admin/orders")}
            className="flex items-center gap-2 text-amber-700 hover:text-amber-900 font-medium mb-4 transition"
          >
            <FiArrowLeft /> <span>Back to Orders</span>
          </button>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-display font-bold text-amber-900 mb-1">
                Order #{order._id.slice(-8)}
              </h1>
              <p className="text-gray-600 text-sm">
                Placed on{" "}
                <span className="font-medium text-gray-800">
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </p>
            </div>
            <span
              className={`px-5 py-2 rounded-full text-sm font-semibold shadow-sm ${getStatusColor(
                order.orderStatus
              )}`}
            >
              {order.orderStatus}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Order Items */}
            <div className="bg-white border border-amber-100 rounded-2xl shadow-sm hover:shadow-md transition-all p-8">
              <h2 className="text-2xl font-semibold text-amber-900 mb-6 flex items-center">
                <FiPackage className="mr-2 text-amber-600" /> Order Items
              </h2>

              <div className="space-y-5">
                {order.orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 pb-5 border-b border-gray-200 last:border-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl border border-amber-100 shadow-sm"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-base">
                        {item.name}
                      </h3>
                      {item.variant && (
                        <p className="text-sm text-gray-600 mt-0.5">
                          Size: {item.variant.size}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </span>
                        <span className="font-semibold text-gray-900">
                          ₹{item.price} × {item.quantity} = ₹
                          {item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white border border-amber-100 rounded-2xl shadow-sm hover:shadow-md transition-all p-8">
              <h2 className="text-2xl font-semibold text-amber-900 mb-6 flex items-center">
                <FiMapPin className="mr-2 text-amber-600" /> Shipping Address
              </h2>

              <div className="text-gray-700 leading-relaxed">
                <p className="font-semibold text-gray-900 text-lg mb-2">
                  {order.user?.name}
                </p>
                <p>{order.shippingInfo.address}</p>
                <p>
                  {order.shippingInfo.city}, {order.shippingInfo.state}{" "}
                  {order.shippingInfo.pinCode}
                </p>
                <p>{order.shippingInfo.country}</p>
                <p className="mt-2">📞 {order.shippingInfo.phoneNo}</p>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white border border-amber-100 rounded-2xl shadow-sm hover:shadow-md transition-all p-8">
              <h2 className="text-2xl font-semibold text-amber-900 mb-6 flex items-center">
                <FiCreditCard className="mr-2 text-amber-600" /> Payment
                Information
              </h2>

              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="font-semibold text-gray-900">
                    {order.paymentInfo.type}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Payment Status:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.paymentInfo.status === "Paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-orange-100 text-orange-800"
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

                {order.paidAt && (
                  <div className="flex justify-between">
                    <span>Paid At:</span>
                    <span className="text-gray-900">
                      {new Date(order.paidAt).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">

            {/* Order Summary */}
            <div className="bg-white border border-amber-100 rounded-2xl shadow-sm hover:shadow-md transition-all p-8">
              <h2 className="text-2xl font-semibold text-amber-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{order.itemsPrice}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold">₹{order.shippingPrice}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span className="font-semibold">₹{order.taxPrice}</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-3xl font-bold text-amber-700">
                      ₹{order.totalPrice}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ⭐ Update Tracking ID */}
<div className="bg-white border border-amber-100 rounded-2xl shadow-sm hover:shadow-md transition-all p-8">
  <h2 className="text-2xl font-semibold text-amber-900 mb-6">
    Tracking Information
  </h2>

  {/* Courier Name */}
  <input
    type="text"
    value={courierName}
    onChange={(e) => setCourierName(e.target.value)}
    placeholder="Enter Courier Name (e.g. BlueDart, Anjani)"
    className="w-full border px-3 py-2 rounded-lg mb-3 focus:ring-2 focus:ring-amber-500"
  />

  {/* Tracking ID */}
  <input
    type="text"
    value={trackingId}
    onChange={(e) => setTrackingId(e.target.value)}
    placeholder="Enter Tracking ID / AWB Number"
    className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-amber-500"
  />

  {/* Save */}
  <button
    onClick={handleTrackingIdUpdate}
    className="w-full mt-3 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-semibold transition"
  >
    Save Tracking Details
  </button>

  {/* Show saved details */}
  {(order.courierName || order.trackingId) && (
    <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex flex-col gap-2">
      <p className="text-sm text-amber-800 font-medium">
        <span className="font-semibold">Courier:</span> {order.courierName || "—"}
      </p>
      <div className="flex items-center justify-between">
        <p className="text-sm text-amber-800 font-medium">
          <span className="font-semibold">Tracking ID:</span> {order.trackingId}
        </p>

        {/* Copy Button */}
        <button
          className="bg-amber-600 text-white px-3 py-1 text-xs rounded-md hover:bg-amber-700"
          onClick={() => {
            navigator.clipboard.writeText(order.trackingId);
            toast.success("Tracking ID copied!");
          }}
        >
          Copy
        </button>
      </div>
    </div>
  )}
</div>

            {/* Update Status */}
            <div className="bg-white border border-amber-100 rounded-2xl shadow-sm hover:shadow-md transition-all p-8">
              <h2 className="text-2xl font-semibold text-amber-900 mb-6">
                Update Status
              </h2>

              <div className="space-y-3">
                <button
                  onClick={() => handleStatusUpdate("Processing")}
                  disabled={order.orderStatus === "Processing"}
                  className="w-full bg-gray-100 hover:bg-amber-50 text-gray-800 py-3 rounded-xl font-semibold transition disabled:opacity-50"
                >
                  Mark as Processing
                </button>
                <button
                  onClick={() => handleStatusUpdate("Shipped")}
                  disabled={order.orderStatus === "Shipped"}
                  className="w-full bg-gray-100 hover:bg-amber-50 text-gray-800 py-3 rounded-xl font-semibold transition disabled:opacity-50"
                >
                  Mark as Shipped
                </button>
                <button
                  onClick={() => handleStatusUpdate("Delivered")}
                  disabled={order.orderStatus === "Delivered"}
                  className="w-full bg-gradient-to-r from-amber-400 to-yellow-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                >
                  Mark as Delivered
                </button>
                <button
                  onClick={handleDeleteOrder}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-all"
                >
                  Delete Order
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
