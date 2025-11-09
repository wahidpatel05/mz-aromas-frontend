// src/pages/Admin/OrdersListPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiPackage } from "react-icons/fi";
import API from "../../config/api";
import { toast } from "react-toastify";

const OrdersListPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/admin/orders");
      setOrders(data.orders);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch orders");
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, status) => {
    try {
      await API.put(`/admin/order/${orderId}`, { status });
      toast.success("Order status updated");
      fetchOrders();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

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

  const filteredOrders = orders.filter((order) =>
    filter === "all" ? true : order.orderStatus === filter
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-amber-100 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-display font-bold text-amber-900 mb-2 flex items-center gap-2">
            <FiPackage className="text-amber-600" /> Orders Management
          </h1>
          <p className="text-gray-600">
            {orders.length} total orders — manage and track order statuses.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white border border-amber-100 rounded-2xl shadow-sm hover:shadow-md p-5 mb-8 transition">
          <div className="flex flex-wrap gap-3">
            {["all", "Processing", "Shipped", "Delivered", "Cancelled"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-5 py-2.5 rounded-xl font-medium text-sm shadow-sm transition-all ${
                    filter === status
                      ? "bg-gradient-to-r from-amber-400 to-yellow-600 text-white shadow-md scale-[1.03]"
                      : "bg-gray-100 text-gray-700 hover:bg-amber-50 hover:text-amber-700"
                  }`}
                >
                  {status === "all" ? "All Orders" : status}
                </button>
              )
            )}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white border border-amber-100 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-amber-50 border-b border-amber-100">
                <tr>
                  {[
                    "Order ID",
                    "Customer",
                    "Items",
                    "Amount",
                    "Payment",
                    "Status",
                    "Date",
                    "Actions",
                  ].map((heading, idx) => (
                    <th
                      key={idx}
                      className="text-left py-4 px-6 font-semibold text-amber-900 text-sm uppercase tracking-wide"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center py-10 text-gray-500 text-base"
                    >
                      No orders found for this filter.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order, index) => (
                    <tr
                      key={order._id}
                      className={`border-b border-gray-100 transition ${
                        index % 2 === 0
                          ? "bg-white"
                          : "bg-amber-50/30 hover:bg-amber-100/40"
                      } hover:shadow-sm`}
                    >
                      <td className="py-4 px-6 font-semibold text-gray-900">
                        #{order._id.slice(-8)}
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {order.user?.name || "N/A"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {order.user?.email}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-700">
                        {order.orderItems.length} item
                        {order.orderItems.length > 1 ? "s" : ""}
                      </td>
                      <td className="py-4 px-6 font-semibold text-gray-900">
                        ₹{order.totalPrice}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                            order.paymentInfo.type === "COD"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {order.paymentInfo.type}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <select
                          value={order.orderStatus}
                          onChange={(e) =>
                            handleStatusUpdate(order._id, e.target.value)
                          }
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${getStatusColor(
                            order.orderStatus
                          )} border-none focus:ring-2 focus:ring-amber-200 outline-none`}
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-4 px-6 text-gray-600 text-sm">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <Link
                          to={`/admin/orders/${order._id}`}
                          className="inline-flex items-center justify-center bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-full p-2 transition-all"
                          title="View Details"
                        >
                          <FiEye size={16} />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersListPage;
