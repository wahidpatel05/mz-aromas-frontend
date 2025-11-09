import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMyOrders } from "../../store/slices/orderSlice";
import { FiPackage, FiTruck, FiCheckCircle } from "react-icons/fi";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const getStatusStyle = (status) => {
    const base =
      "flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full shadow-sm border";
    switch (status) {
      case "Processing":
        return `${base} bg-amber-50 text-amber-700 border-amber-200`;
      case "Shipped":
        return `${base} bg-blue-50 text-blue-700 border-blue-200`;
      case "Delivered":
        return `${base} bg-green-50 text-green-700 border-green-200`;
      case "Cancelled":
        return `${base} bg-red-50 text-red-700 border-red-200`;
      default:
        return `${base} bg-gray-50 text-gray-700 border-gray-200`;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Processing":
        return <FiPackage className="text-amber-600" />;
      case "Shipped":
        return <FiTruck className="text-blue-600" />;
      case "Delivered":
        return <FiCheckCircle className="text-green-600" />;
      default:
        return <FiPackage className="text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-600"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-amber-50 via-white to-amber-100 text-center px-4">
        <div className="text-6xl mb-4">📦</div>
        <h2 className="text-3xl font-display font-bold text-amber-900 mb-3">
          No Orders Yet
        </h2>
        <p className="text-gray-700 mb-8 max-w-sm">
          You haven’t placed any orders yet — your journey starts here.
        </p>
        <Link
          to="/products"
          className="bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-amber-100 min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-amber-900 mb-2">
            My Orders
          </h1>
          <p className="text-gray-600 text-sm">
            {orders.length} {orders.length === 1 ? "order" : "orders"} found
          </p>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-amber-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Order Header */}
              <div className="bg-gradient-to-r from-amber-50 via-white to-amber-50 px-6 py-5 border-b border-gray-100 flex justify-between items-start">
                <div>
                  <div className="text-xs text-gray-500">Order ID</div>
                  <div className="text-sm font-semibold text-gray-800 tracking-wide">
                    #{order._id.slice(-8)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Placed on{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
                <span className={getStatusStyle(order.orderStatus)}>
                  {getStatusIcon(order.orderStatus)}
                  {order.orderStatus}
                </span>
              </div>

              {/* Items */}
              <div className="px-6 py-5 space-y-4">
                {order.orderItems.slice(0, 2).map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-amber-100 shadow-sm">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-600">
                        Qty: {item.quantity}
                      </p>
                      <div className="text-sm font-semibold text-amber-800">
                        ₹{item.price}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Show "+N more" */}
                {order.orderItems.length > 2 && (
                  <p className="text-xs text-gray-500 italic">
                    +{order.orderItems.length - 2} more items
                  </p>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center bg-white">
                <div>
                  <p className="text-xs text-gray-600">Total Amount</p>
                  <p className="text-lg font-bold text-amber-800">
                    ₹{order.totalPrice}
                  </p>
                </div>
                <Link
                  to={`/order/${order._id}`}
                  className="bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
