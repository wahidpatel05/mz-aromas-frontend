import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { X, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../../assets/bg_logo.png"

const RazorpayPayment = ({ amount, onSuccess, onClose }) => {
  const [loading, setLoading] = useState(false);

  // ----------------------------------------------
  // Load Razorpay script dynamically
  // ----------------------------------------------
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  // ----------------------------------------------
  // Main Payment Handler
  // ----------------------------------------------
  const handleRazorpayPayment = async () => {
    try {
      setLoading(true);

      
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        toast.error("Failed to load Razorpay. Try again.");
        return;
      }

      
      const { data: keyData } = await axios.get("/api/razorpaykey");
      const key = keyData.key;

      
      const { data: orderData } = await axios.post(
        "/api/payment/razorpay/order",
        { amount }
      );

      if (!orderData.success) {
        toast.error("Failed to create order.");
        return;
      }

      const order = orderData.order;

      
      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "MZ Aromas",
        description: "Order Payment",
        image: logo, 
        order_id: order.id,

        handler: async (response) => {
          try {
            // 4️⃣ Verify Payment
            const verifyRes = await axios.post("/api/payment/razorpay/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data.success) {
              toast.success("Payment Successful!");
              onSuccess(verifyRes.data);
              onClose();
            } else {
              toast.error("Payment verification failed");
            }
          } catch {
            toast.error("Payment verification error");
          }
        },

        prefill: {
          name: "Customer",
          email: "customer@example.com",
          contact: "9999999999",
        },

        theme: {
          color: "#f59e0b",
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.on("payment.failed", function (response) {
        toast.error(response.error.description || "Payment Failed");
      });

      // 5️⃣ Open Razorpay Popup
      paymentObject.open();
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[9999]">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-7 rounded-xl shadow-2xl w-full max-w-md relative"
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black transition"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Complete Your Payment
        </h2>

        <p className="text-gray-600 mb-6">
          You are about to pay:
          <span className="font-bold text-amber-600"> ₹{amount}</span>
        </p>

        <button
          onClick={handleRazorpayPayment}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition disabled:bg-gray-400"
        >
          {loading ? (
            <Loader2 className="mx-auto animate-spin" size={22} />
          ) : (
            "Pay Now"
          )}
        </button>
      </motion.div>
    </div>
  );
};

export default RazorpayPayment;
