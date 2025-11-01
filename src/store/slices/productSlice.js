// src/store/slices/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../config/api";

// Get All Products
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const { data } = await API.get(`/products?${queryString}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Get Product by Slug
export const fetchProductBySlug = createAsyncThunk(
  "products/fetchBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/product/slug/${slug}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Get Featured Products
export const fetchFeaturedProducts = createAsyncThunk(
  "products/fetchFeatured",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/products/featured");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Get Related Products
export const fetchRelatedProducts = createAsyncThunk(
  "products/fetchRelated",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/product/${productId}/related`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    featuredProducts: [],
    relatedProducts: [],
    currentProduct: null,
    loading: false,
    error: null,
    productsCount: 0,
    resultPerPage: 12,
    filteredProductsCount: 0,
  },
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.productsCount = action.payload.productsCount;
        state.resultPerPage = action.payload.resultPerPage;
        state.filteredProductsCount = action.payload.filteredProductsCount;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // Fetch Product by Slug
      .addCase(fetchProductBySlug.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload.product;
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // Fetch Featured Products
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.featuredProducts = action.payload.products;
      })
      // Fetch Related Products
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.relatedProducts = action.payload.products;
      });
  },
});

export const { clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
