// src/store/slices/orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../config/api";
import { toast } from "react-toastify";

// Create Order
export const createOrder = createAsyncThunk(
  "orders/create",
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/order/new", orderData);
      toast.success("Order placed successfully!");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Order failed");
      return rejectWithValue(error.response?.data);
    }
  }
);

// Get My Orders
export const fetchMyOrders = createAsyncThunk(
  "orders/fetchMy",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/orders/me");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Get Order Details
export const fetchOrderDetails = createAsyncThunk(
  "orders/fetchDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/order/${orderId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.currentOrder = action.payload.order;
      });
  },
});

export const { clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
