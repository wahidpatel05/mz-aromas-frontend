// src/store/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const loadCartFromStorage = () => {
  try {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    return [];
  }
};

const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartFromStorage(),
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, variant, quantity } = action.payload;

      const existingItem = state.items.find(
        (item) =>
          item.product._id === product._id &&
          item.variant?.size === variant?.size
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        toast.success("Cart updated");
      } else {
        state.items.push({
          product,
          variant,
          quantity,
        });
        toast.success("Added to cart");
      }

      saveCartToStorage(state.items);
    },

    removeFromCart: (state, action) => {
      const { productId, variantSize } = action.payload;
      state.items = state.items.filter(
        (item) =>
          !(
            item.product._id === productId && item.variant?.size === variantSize
          )
      );
      saveCartToStorage(state.items);
      toast.success("Removed from cart");
    },

    updateQuantity: (state, action) => {
      const { productId, variantSize, quantity } = action.payload;
      const item = state.items.find(
        (item) =>
          item.product._id === productId && item.variant?.size === variantSize
      );

      if (item) {
        item.quantity = quantity;
        saveCartToStorage(state.items);
      }
    },

    clearCart: (state) => {
      state.items = [];
      saveCartToStorage([]);
      toast.success("Cart cleared");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
