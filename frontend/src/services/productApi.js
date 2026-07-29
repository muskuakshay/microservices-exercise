import axios from "axios";

const productApi = axios.create({
  baseURL: "http://localhost:8081/api/products",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchProducts = async () => {
  const response = await productApi.get("");
  return response.data;
};

export const fetchPagedProducts = async ({
  page = 0,
  size = 5,
  sortField = "id",
  sortDirection = "asc",
}) => {
  const response = await productApi.get("/paged", {
    params: {
      page,
      size,
      sortField,
      sortDirection,
    },
  });

  return response.data;
};

export const createProduct = async (product) => {
  const response = await productApi.post("", product);
  return response.data;
};