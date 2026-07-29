import {
    createAsyncThunk,
    createSlice,
  } from "@reduxjs/toolkit";
  
  import {
    addCartItem,
    fetchCartItems,
  } from "../services/cartApi";
  
  export const loadCartItems = createAsyncThunk(
    "cart/loadCartItems",
    async () => {
      return await fetchCartItems();
    }
  );
  
  export const createCartItem = createAsyncThunk(
    "cart/createCartItem",
    async (cartItem) => {
      return await addCartItem(cartItem);
    }
  );
  
  const initialState = {
    items: [],
    loading: false,
    error: "",
  };
  
  const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(loadCartItems.pending, (state) => {
          state.loading = true;
          state.error = "";
        })
        .addCase(loadCartItems.fulfilled, (state, action) => {
          state.loading = false;
          state.items = action.payload;
        })
        .addCase(loadCartItems.rejected, (state) => {
          state.loading = false;
          state.error = "Unable to load cart items.";
        })
        .addCase(createCartItem.pending, (state) => {
          state.loading = true;
          state.error = "";
        })
        .addCase(createCartItem.fulfilled, (state, action) => {
          state.loading = false;
          state.items.push(action.payload);
        })
        .addCase(createCartItem.rejected, (state) => {
          state.loading = false;
          state.error = "Unable to add product to cart.";
        });
    },
  });
  
  export default cartSlice.reducer;