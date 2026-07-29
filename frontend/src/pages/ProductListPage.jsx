import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../features/productSlice";
import { createCartItem } from "../features/cartSlice";
import LoadingSpinner from "../components/LoadingSpinner";

function ProductListPage() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.items);
  const productLoading = useSelector(
    (state) => state.products.loading
  );
  const productError = useSelector(
    (state) => state.products.error
  );

  const cartLoading = useSelector(
    (state) => state.cart.loading
  );
  const cartError = useSelector(
    (state) => state.cart.error
  );

  const [searchText, setSearchText] = useState("");
  const [maximumPrice, setMaximumPrice] = useState("");

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

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

  const handleAddToCart = async (productId) => {
    try {
      await dispatch(
        createCartItem({
          cartId: 2,
          productId,
          quantity: 1,
        })
      ).unwrap();

      alert("Product added to cart.");
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  return (
    <div>
      <h1>Products</h1>

      <div className="product-filters">
        <div>
          <label htmlFor="product-search">
            Search by name
          </label>

          <input
            id="product-search"
            type="text"
            placeholder="Search products"
            value={searchText}
            onChange={(event) =>
              setSearchText(event.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="maximum-price">
            Maximum price
          </label>

          <input
            id="maximum-price"
            type="number"
            min="0"
            step="0.01"
            placeholder="Enter maximum price"
            value={maximumPrice}
            onChange={(event) =>
              setMaximumPrice(event.target.value)
            }
          />
        </div>
      </div>

      {productLoading && (
        <LoadingSpinner message="Loading products..." />
      )}

      {productError && (
        <p className="error-message">{productError}</p>
      )}

      {cartError && (
        <p className="error-message">{cartError}</p>
      )}

      {!productLoading && filteredProducts.length === 0 && (
        <p>No products match your search.</p>
      )}

      {!productLoading && filteredProducts.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>
                  ${Number(product.price).toFixed(2)}
                </td>
                <td>{product.stock}</td>
                <td>
                  <button
                    type="button"
                    disabled={cartLoading}
                    onClick={() =>
                      handleAddToCart(product.id)
                    }
                  >
                    {cartLoading
                      ? "Adding..."
                      : "Add to Cart"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductListPage;