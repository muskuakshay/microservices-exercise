import {
    createAsyncThunk,
    createSlice,
  } from "@reduxjs/toolkit";
  
  import {
    createProduct,
    fetchPagedProducts,
  } from "../services/productApi";
  
  export const loadProducts = createAsyncThunk(
    "products/loadProducts",
    async ({
      page = 0,
      size = 5,
      sortField = "id",
      sortDirection = "asc",
    } = {}) => {
      return await fetchPagedProducts({
        page,
        size,
        sortField,
        sortDirection,
      });
    }
  );
  
  export const addProduct = createAsyncThunk(
    "products/addProduct",
    async (product) => {
      return await createProduct(product);
    }
  );
  
  const initialState = {
    items: [],
    loading: false,
    error: "",
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 5,
  };
  
  const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(loadProducts.pending, (state) => {
          state.loading = true;
          state.error = "";
        })
        .addCase(loadProducts.fulfilled, (state, action) => {
          state.loading = false;
          state.items = action.payload.content;
          state.currentPage = action.payload.number;
          state.totalPages = action.payload.totalPages;
          state.totalElements = action.payload.totalElements;
          state.pageSize = action.payload.size;
        })
        .addCase(loadProducts.rejected, (state) => {
          state.loading = false;
          state.error = "Unable to load products.";
        })
        .addCase(addProduct.pending, (state) => {
          state.loading = true;
          state.error = "";
        })
        .addCase(addProduct.fulfilled, (state) => {
          state.loading = false;
        })
        .addCase(addProduct.rejected, (state) => {
          state.loading = false;
          state.error = "Unable to create product.";
        });
    },
  });
  
  export default productSlice.reducer;