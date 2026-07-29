import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCartItems } from "../features/cartSlice";

function CartPage() {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items);
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);

  useEffect(() => {
    dispatch(loadCartItems());
  }, [dispatch]);

  return (
    <div>
      <h1>Cart Items</h1>

      {loading && <p>Loading cart items...</p>}
      {error && <p>{error}</p>}

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
    </div>
  );
}

export default CartPage;