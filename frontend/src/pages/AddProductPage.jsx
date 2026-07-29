import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../features/productSlice";
import LoadingSpinner from "../components/LoadingSpinner";

function AddProductPage() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const product = {
      name: formData.name,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    try {
      const createdProduct = await dispatch(
        addProduct(product)
      ).unwrap();

      setMessage(
        `Product "${createdProduct.name}" was created successfully.`
      );

      setFormData({
        name: "",
        price: "",
        stock: "",
      });
    } catch (requestError) {
      console.error("Failed to create product:", requestError);
    }
  };

  return (
    <div>
      <h1>Add Product</h1>

      {loading && (
        <LoadingSpinner message="Creating product..." />
      )}

      {message && (
        <p className="success-message">{message}</p>
      )}

      {error && (
        <p className="error-message">{error}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Product Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProductPage;