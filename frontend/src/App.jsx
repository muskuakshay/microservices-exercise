import { useState } from "react";
import ProductListPage from "./pages/ProductListPage";
import AddProductPage from "./pages/AddProductPage";
import CartPage from "./pages/CartPage";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("products");

  return (
    <div className="app">
      <nav>
        <button onClick={() => setCurrentPage("products")}>
          Products
        </button>

        <button onClick={() => setCurrentPage("add-product")}>
          Add Product
        </button>

        <button onClick={() => setCurrentPage("cart")}>
          Cart
        </button>
      </nav>

      <main>
        {currentPage === "products" && <ProductListPage />}
        {currentPage === "add-product" && <AddProductPage />}
        {currentPage === "cart" && <CartPage />}
      </main>
    </div>
  );
}

export default App;