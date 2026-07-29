import { useEffect } from "react";
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

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

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

      {productLoading && (
        <LoadingSpinner message="Loading products..." />
      )}

      {productError && (
        <p className="error-message">{productError}</p>
      )}

      {cartError && (
        <p className="error-message">{cartError}</p>
      )}

      {!productLoading && (
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
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${Number(product.price).toFixed(2)}</td>
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