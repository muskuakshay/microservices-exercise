import { useState } from "react";
import ProductListPage from "./pages/ProductListPage";
import AddProductPage from "./pages/AddProductPage";
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
      </nav>

      <main>
        {currentPage === "products" ? (
          <ProductListPage />
        ) : (
          <AddProductPage />
        )}
      </main>
    </div>
  );
}

export default App;