import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
const normalizedApiUrl = apiUrl.replace(/\/$/, "").replace(/\/api$/, "");

const api = axios.create({
  baseURL: `${normalizedApiUrl}/api`
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("taskflowToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("taskflowToken");
      localStorage.removeItem("taskflowUser");
      window.dispatchEvent(new Event("taskflow:logout"));
    }

    return Promise.reject(error);
  }
);

export default api;
