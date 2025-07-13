import axios from 'axios';
import { toast } from "sonner";

const api = axios.create({
  baseURL: 'https://localhost:7243',
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('authToken'); // Usando sessionStorage temporariamente
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
      sessionStorage.removeItem('authToken'); // Usando sessionStorage temporariamente
      
      toast.error("Sessão Expirada", {
        description: "Por favor, faça o login novamente.",
      });

      if (window.location.pathname !== '/login') {
         window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;