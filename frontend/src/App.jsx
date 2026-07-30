import { NavLink } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

function App() {
  return (
    <div className="app">
      <nav>
        <NavLink to="/products">
          Products
        </NavLink>

        <NavLink to="/add-product">
          Add Product
        </NavLink>

        <NavLink to="/cart">
          Cart
        </NavLink>
      </nav>

      <main>
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;