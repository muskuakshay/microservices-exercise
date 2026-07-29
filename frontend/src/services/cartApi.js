import axios from "axios";

const cartApi = axios.create({
  baseURL: "http://localhost:8082/api/carts",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchCartItems = async () => {
  const response = await cartApi.get("/items");
  return response.data;
};

export const addCartItem = async (cartItem) => {
  const response = await cartApi.post("/items", cartItem);
  return response.data;
};