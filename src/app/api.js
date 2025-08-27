// Wrapper for HTTP requests with Axios
import axios from 'axios';

const api = axios.create({
   baseURL: 'http://localhost:3002/',
   headers: {'Content-Type': 'application/json'}
});

// Add an interceptor for all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or React state
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

export default api;