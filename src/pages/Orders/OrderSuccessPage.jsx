import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiCheckCircle, FiPackage, FiHome } from "react-icons/fi";

const OrderSuccessPage = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white/90 border border-amber-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 p-10 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <FiCheckCircle className="text-amber-600" size={50} />
            </div>
            <h1 className="text-3xl font-display font-bold text-amber-900 mb-2">
              Order Placed Successfully!
            </h1>
            <p className="text-gray-700 max-w-sm mx-auto">
              Thank you for your purchase! Your order has been received and is
              now being processed.
            </p>
          </div>

          {/* Order ID */}
          {orderId && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6">
              <div className="text-sm text-gray-600 mb-1 font-medium">
                Order ID
              </div>
              <div className="font-semibold text-amber-800 text-lg">
                #{orderId.slice(-8)}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="space-y-4">
            <Link
              to={orderId ? `/order/${orderId}` : "/orders"}
              className="w-full bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all"
            >
              <FiPackage />
              <span>View Order Details</span>
            </Link>

            <Link
              to="/"
              className="w-full bg-white border-2 border-amber-300 hover:bg-amber-50 text-amber-800 font-semibold py-3 rounded-xl flex items-center justify-center space-x-2 transition-all"
            >
              <FiHome />
              <span>Continue Shopping</span>
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-amber-100">
            <p className="text-sm text-gray-600 leading-relaxed">
              A confirmation email has been sent to your registered address.
              You’ll receive updates as your order is packed, shipped, and
              delivered.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
