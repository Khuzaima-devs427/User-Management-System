import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// User API functions
export const userAPI = {
  // Register new user
  register: async (userData) => {
    const response = await api.post('/users/register', userData);
    return response.data;
  },

  // Login user
  login: async (loginData) => {
    const response = await api.post('/users/login', loginData);
    return response.data;
  },

  // Get all users
  getUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  // Get user by ID
  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Update user
  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  // Delete user
  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  }
};