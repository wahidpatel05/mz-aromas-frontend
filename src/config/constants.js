// src/config/constants.js
export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";
export const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY || "";

export const PRODUCT_CATEGORIES = [
  "Attar",
  "Agarbatti",
  "Soap",
  "Essential Oils",
  "Dhoop",
  "Scented Candles",
  "Room Fresheners",
  "Gift Sets",
  "Raw Materials",
  "Aroma Chemicals",
];

export const ORDER_STATUS = {
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export const PAYMENT_METHODS = {
  RAZORPAY: "Razorpay",
  COD: "COD",
};
