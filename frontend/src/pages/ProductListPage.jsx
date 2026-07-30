import LoadingSpinner from "../components/LoadingSpinner";
import useProducts from "../hooks/useProducts";

function ProductListPage() {
  const {
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
  } = useProducts();

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId);
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
        <>
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

          <div className="pagination">
            <button
              type="button"
              disabled={currentPage === 0}
              onClick={() => fetchPage(currentPage - 1)}
            >
              Previous
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index
            ).map((page) => (
              <button
                key={page}
                type="button"
                disabled={page === currentPage}
                onClick={() => fetchPage(page)}
              >
                {page + 1}
              </button>
            ))}

            <button
              type="button"
              disabled={
                totalPages === 0 ||
                currentPage === totalPages - 1
              }
              onClick={() => fetchPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductListPage;