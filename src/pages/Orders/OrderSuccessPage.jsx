// src/pages/Orders/OrderSuccessPage.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiCheckCircle, FiPackage, FiHome } from "react-icons/fi";

const OrderSuccessPage = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheckCircle className="text-green-600" size={40} />
            </div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              Order Placed Successfully!
            </h1>
            <p className="text-gray-600">
              Thank you for your purchase. Your order has been received and is
              being processed.
            </p>
          </div>

          {orderId && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-sm text-gray-600 mb-1">Order ID</div>
              <div className="font-semibold text-gray-900">
                #{orderId.slice(-8)}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Link
              to={orderId ? `/order/${orderId}` : "/orders"}
              className="w-full btn-primary py-3 flex items-center justify-center space-x-2"
            >
              <FiPackage />
              <span>View Order Details</span>
            </Link>

            <Link
              to="/"
              className="w-full btn-secondary py-3 flex items-center justify-center space-x-2"
            >
              <FiHome />
              <span>Continue Shopping</span>
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              A confirmation email has been sent to your registered email
              address.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
