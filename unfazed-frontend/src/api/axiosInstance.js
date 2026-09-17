import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://unfazed-unlox.onrender.com/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to attach JWT token & therapist fallback ID
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("unfazed_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const therapistId = localStorage.getItem("unfazed_therapist_id") || "66e01a9b4000000000000001";
    config.headers["x-therapist-id"] = therapistId;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
