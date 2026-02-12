import api from './api';

export const authService = {
  // Payload matches RegisterRequest.java: { name, email, password }
  register: async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data; // Returns AuthenticationResponse { token }
  },

  // Payload matches LoginRequest.java: { email, password }
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('jwt_token', response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('jwt_token');
  }
};