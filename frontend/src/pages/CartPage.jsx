import LoadingSpinner from "../components/LoadingSpinner";
import useCart from "../hooks/useCart";

function CartPage() {
  const {
    items,
    loading,
    error,
    refreshCart,
  } = useCart();

  return (
    <div>
      <h1>Cart</h1>

      <button
        type="button"
        onClick={refreshCart}
        disabled={loading}
      >
        {loading ? "Refreshing..." : "Refresh Cart"}
      </button>

      {loading && (
        <LoadingSpinner message="Loading cart items..." />
      )}

      {error && (
        <p className="error-message">{error}</p>
      )}

      {!loading && items.length === 0 && (
        <p>Your cart is empty.</p>
      )}

      {!loading && items.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cart ID</th>
              <th>Product ID</th>
              <th>Quantity</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.cartId}</td>
                <td>{item.productId}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CartPage;