// APPS/web/src/services/api.ts
import axios from 'axios';
import { toast } from "sonner";

const api = axios.create({
  baseURL: 'https://localhost:7243', // Changed from http://localhost:3000
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("API returned 401 - Unauthorized");

      // Only redirect if we're not already on login page and not on settings page
      if (window.location.pathname !== '/login' && window.location.pathname !== '/settings') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');

        toast.error("Sessão Expirada", {
          description: "Por favor, faça o login novamente.",
        });

        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
export default api;