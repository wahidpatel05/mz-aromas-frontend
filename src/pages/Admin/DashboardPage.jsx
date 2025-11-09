// src/pages/Admin/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiShoppingBag,
  FiPackage,
  FiUsers,
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,
} from "react-icons/fi";
import API from "../../config/api";

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [productsRes, ordersRes, usersRes] = await Promise.all([
        API.get("/admin/products"),
        API.get("/admin/orders"),
        API.get("/admin/users"),
      ]);

      const totalRevenue = ordersRes.data.totalAmount || 0;
      const recentOrders = ordersRes.data.orders.slice(0, 5);

      setStats({
        totalProducts: productsRes.data.products.length,
        totalOrders: ordersRes.data.orders.length,
        totalUsers: usersRes.data.users.length,
        totalRevenue,
        recentOrders,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: FiDollarSign,
      gradient: "from-amber-400 to-yellow-500",
      trend: "+12.5%",
      trendUp: true,
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: FiPackage,
      gradient: "from-blue-400 to-indigo-500",
      trend: "+8.2%",
      trendUp: true,
    },
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: FiShoppingBag,
      gradient: "from-purple-400 to-pink-500",
      trend: "+5.4%",
      trendUp: true,
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: FiUsers,
      gradient: "from-orange-400 to-red-500",
      trend: "-2.1%",
      trendUp: false,
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-display font-bold text-amber-900 mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trendUp ? FiTrendingUp : FiTrendingDown;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all p-6 hover:-translate-y-1 duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-md`}
                  >
                    <Icon className="text-white" size={24} />
                  </div>
                  <div
                    className={`flex items-center space-x-1 text-sm font-medium ${
                      stat.trendUp ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <TrendIcon size={16} />
                    <span>{stat.trend}</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Orders */}
        <div className="bg-white border border-amber-100 rounded-2xl shadow-sm hover:shadow-md transition-all p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-amber-900">
              Recent Orders
            </h2>
            <Link
              to="/admin/orders"
              className="text-amber-600 hover:text-amber-700 font-semibold text-sm transition"
            >
              View All →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-amber-50 border-b border-amber-100">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-amber-900">
                    Order ID
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-amber-900">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-amber-900">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-amber-900">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-amber-900">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order, i) => (
                  <tr
                    key={order._id}
                    className={`border-b border-gray-100 ${
                      i % 2 === 0 ? "bg-white" : "bg-amber-50/30"
                    } hover:bg-amber-100/30 transition`}
                  >
                    <td className="py-3 px-4 font-medium text-gray-900">
                      #{order._id.slice(-8)}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {order.user?.name || "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.orderStatus === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.orderStatus === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-900">
                      ₹{order.totalPrice}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {stats.recentOrders.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                No recent orders found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
