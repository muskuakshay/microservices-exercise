import {
    createAsyncThunk,
    createSlice,
  } from "@reduxjs/toolkit";
  
  import {
    createProduct,
    fetchProducts,
  } from "../services/productApi";
  
  export const loadProducts = createAsyncThunk(
    "products/loadProducts",
    async () => {
      return await fetchProducts();
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
          state.items = action.payload;
        })
        .addCase(loadProducts.rejected, (state) => {
          state.loading = false;
          state.error = "Unable to load products.";
        })
        .addCase(addProduct.pending, (state) => {
          state.loading = true;
          state.error = "";
        })
        .addCase(addProduct.fulfilled, (state, action) => {
          state.loading = false;
          state.items.push(action.payload);
        })
        .addCase(addProduct.rejected, (state) => {
          state.loading = false;
          state.error = "Unable to create product.";
        });
    },
  });
  
  export default productSlice.reducer;