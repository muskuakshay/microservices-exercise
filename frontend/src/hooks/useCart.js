import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCartItem,
  loadCartItems,
} from "../features/cartSlice";

function useCart() {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items);
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);

  const refreshCart = useCallback(() => {
    dispatch(loadCartItems());
  }, [dispatch]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addItem = useCallback(
    async ({ cartId, productId, quantity }) => {
      return await dispatch(
        createCartItem({
          cartId,
          productId,
          quantity,
        })
      ).unwrap();
    },
    [dispatch]
  );

  return {
    items,
    loading,
    error,
    refreshCart,
    addItem,
  };
}

export default useCart;