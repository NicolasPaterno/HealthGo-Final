// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7243', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;