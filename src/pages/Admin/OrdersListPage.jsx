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

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    return order.orderStatus === filter;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Orders Management
        </h1>
        <p className="text-gray-600">{orders.length} total orders</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-3">
          {["all", "Processing", "Shipped", "Delivered", "Cancelled"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === status
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status === "all" ? "All Orders" : status}
              </button>
            )
          )}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Order ID
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Customer
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Items
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Amount
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Payment
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Date
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-6">
                    <span className="font-medium text-gray-900">
                      #{order._id.slice(-8)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-900">
                        {order.user?.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.user?.email}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {order.orderItems.length} items
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-semibold text-gray-900">
                      ₹{order.totalPrice}
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
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
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        order.orderStatus
                      )}`}
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
                  <td className="py-4 px-6">
                    <Link
                      to={`/admin/orders/${order._id}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <FiEye size={18} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersListPage;
