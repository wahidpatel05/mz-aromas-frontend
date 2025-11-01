// src/store/slices/wishlistSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../config/api";
import { toast } from "react-toastify";

// Get Wishlist
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/wishlist");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Add to Wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/add",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/wishlist", { productId });
      toast.success("Added to wishlist");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add");
      return rejectWithValue(error.response?.data);
    }
  }
);

// Remove from Wishlist
export const removeFromWishlist = createAsyncThunk(
  "wishlist/remove",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await API.delete(`/wishlist/${productId}`);
      toast.success("Removed from wishlist");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products || [];
      })
      .addCase(fetchWishlist.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items = action.payload.wishlist?.products || state.items;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = action.payload.wishlist?.products || [];
      });
  },
});

export default wishlistSlice.reducer;
