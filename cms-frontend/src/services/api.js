import axios from 'axios';

//const BASE_URL = 'http://localhost:8080';

// If VITE_API_URL is set (in cloud), use it. Otherwise use localhost (for your computer)
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Attach JWT Token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor: Handle 403/401 Errors (Token Expiry)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 403 || error.response.status === 401)) {
      localStorage.removeItem('jwt_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;