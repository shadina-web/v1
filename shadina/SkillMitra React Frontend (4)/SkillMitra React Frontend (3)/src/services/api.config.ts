/**
 * API Service Configuration
 * Axios instance with interceptors for API calls
 */

import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('authToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (import.meta.env.DEV) {
      console.log(`🌐 ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors and unauthorized access
api.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
    }
    return response;
  },
  (error) => {
    // Handle different error types
    if (error.response) {
      const { status, data } = error.response;

      // Unauthorized - clear auth and redirect to login
      if (status === 401) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(new Error('Session expired. Please login again.'));
      }

      // Forbidden
      if (status === 403) {
        return Promise.reject(new Error(data.message || 'You do not have permission to perform this action.'));
      }

      // Not found
      if (status === 404) {
        return Promise.reject(new Error(data.message || 'Resource not found.'));
      }

      // Server error
      if (status >= 500) {
        return Promise.reject(new Error('Server error. Please try again later.'));
      }

      // Other errors
      return Promise.reject(new Error(data.message || 'An error occurred.'));
    }

    // Network error
    if (error.request) {
      return Promise.reject(new Error('Network error. Please check your connection.'));
    }

    return Promise.reject(error);
  }
);

export default api;
