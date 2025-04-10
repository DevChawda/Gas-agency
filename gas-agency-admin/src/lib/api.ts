import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Add interceptors for auth tokens
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchDashboardData = async () => {
  const response = await api.get("/dashboard");
  return response.data;
};

export const fetchOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};