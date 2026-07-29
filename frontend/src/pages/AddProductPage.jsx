import { useState } from "react";
import { createProduct } from "../services/productApi";

function AddProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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
    setError("");

    const product = {
      name: formData.name,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    try {
      const createdProduct = await createProduct(product);

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
      setError("Unable to create product.");
    }
  };

  return (
    <div>
      <h1>Add Product</h1>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

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

        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}

export default AddProductPage;