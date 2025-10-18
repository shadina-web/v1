/**
 * Authentication API Service
 * Handles all authentication-related API calls
 */

import api from './api.config';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'WORKER' | 'EMPLOYER';
  preferredLanguage?: 'en' | 'hi' | 'ml';
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface UpdatePasswordData {
  currentPassword: string;
  newPassword: string;
}

/**
 * Register a new user
 */
export const register = async (data: RegisterData): Promise<any> => {
  const response = await api.post('/auth/register', data);
  
  // Backend returns just the User object, not AuthResponse format
  // So we don't save token here, user needs to login after registration
  return response.data;
};

/**
 * Login user
 */
export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', data);
  
  // Backend returns { token: "jwt-token-string" }
  // Save token to localStorage
  if (response.data.token) {
    localStorage.setItem('authToken', response.data.token);
  }
  
  return response.data;
};

/**
 * Get current user
 */
export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  
  // Update user in localStorage if available
  if (response.data.user) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  
  return response.data;
};

/**
 * Update password
 */
export const updatePassword = async (data: UpdatePasswordData) => {
  const response = await api.put('/auth/update-password', data);
  
  // Update token in localStorage if available
  if (response.data.token) {
    localStorage.setItem('authToken', response.data.token);
  }
  
  return response.data;
};

/**
 * Logout user
 */
export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Clear local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('authToken');
  return !!token;
};

/**
 * Get stored user data
 */
export const getStoredUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};
