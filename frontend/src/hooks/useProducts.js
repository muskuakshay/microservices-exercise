import {
    useCallback,
    useEffect,
    useMemo,
    useState,
  } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { loadProducts } from "../features/productSlice";
  import { createCartItem } from "../features/cartSlice";
  
  function useProducts() {
    const dispatch = useDispatch();
  
    const products = useSelector(
      (state) => state.products.items
    );
    const productLoading = useSelector(
      (state) => state.products.loading
    );
    const productError = useSelector(
      (state) => state.products.error
    );
    const currentPage = useSelector(
      (state) => state.products.currentPage
    );
    const totalPages = useSelector(
      (state) => state.products.totalPages
    );
    const pageSize = useSelector(
      (state) => state.products.pageSize
    );
  
    const cartLoading = useSelector(
      (state) => state.cart.loading
    );
    const cartError = useSelector(
      (state) => state.cart.error
    );
  
    const [searchText, setSearchText] = useState("");
    const [maximumPrice, setMaximumPrice] = useState("");
  
    const fetchPage = useCallback(
      (page) => {
        dispatch(
          loadProducts({
            page,
            size: pageSize,
            sortField: "id",
            sortDirection: "asc",
          })
        );
      },
      [dispatch, pageSize]
    );
  
    useEffect(() => {
      fetchPage(0);
    }, [fetchPage]);
  
    const filteredProducts = useMemo(() => {
      const normalizedSearch = searchText
        .trim()
        .toLowerCase();
  
      const maximumPriceNumber =
        maximumPrice === ""
          ? null
          : Number(maximumPrice);
  
      return products.filter((product) => {
        const matchesName = product.name
          .toLowerCase()
          .includes(normalizedSearch);
  
        const matchesPrice =
          maximumPriceNumber === null ||
          Number(product.price) <= maximumPriceNumber;
  
        return matchesName && matchesPrice;
      });
    }, [products, searchText, maximumPrice]);
  
    const addToCart = useCallback(
      async (productId) => {
        await dispatch(
          createCartItem({
            cartId: 2,
            productId,
            quantity: 1,
          })
        ).unwrap();
      },
      [dispatch]
    );
  
    return {
      filteredProducts,
      productLoading,
      productError,
      cartLoading,
      cartError,
      currentPage,
      totalPages,
      searchText,
      maximumPrice,
      setSearchText,
      setMaximumPrice,
      fetchPage,
      addToCart,
    };
  }
  
  export default useProducts;