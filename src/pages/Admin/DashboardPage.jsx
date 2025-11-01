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
      color: "bg-green-500",
      trend: "+12.5%",
      trendUp: true,
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: FiPackage,
      color: "bg-blue-500",
      trend: "+8.2%",
      trendUp: true,
    },
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: FiShoppingBag,
      color: "bg-purple-500",
      trend: "+5.4%",
      trendUp: true,
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: FiUsers,
      color: "bg-orange-500",
      trend: "-2.1%",
      trendUp: false,
    },
  ];

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
          Dashboard Overview
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trendUp ? FiTrendingUp : FiTrendingDown;

          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
                <div
                  className={`flex items-center space-x-1 text-sm ${
                    stat.trendUp ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <TrendIcon size={16} />
                  <span>{stat.trend}</span>
                </div>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
          <Link
            to="/admin/orders"
            className="text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            View All →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Order ID
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Customer
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Amount
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900">
                      #{order._id.slice(-8)}
                    </span>
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
                  <td className="py-3 px-4 text-gray-600 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
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

export default DashboardPage;
