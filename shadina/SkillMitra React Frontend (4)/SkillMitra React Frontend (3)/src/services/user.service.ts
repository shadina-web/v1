/**
 * User API Service
 * Handles all user-related API calls
 */

import api from './api.config';

export interface UpdateProfileData {
  name?: string;
  phone?: string;
  location?: string;
  bio?: string;
  avatar?: string;
  skills?: string[];
  interests?: string[];
  preferredLanguage?: 'en' | 'hi' | 'ml';
}

/**
 * Get all users with filters
 */
export const getUsers = async (params?: {
  page?: number;
  limit?: number;
  location?: string;
  skills?: string;
  search?: string;
}) => {
  const response = await api.get('/users', { params });
  return response.data;
};

/**
 * Get user by ID
 */
export const getUserById = async (id: string) => {
  const response = await api.get(`/user/profile`);
  return response.data;
};

/**
 * Update user profile
 */
export const updateProfile = async (data: UpdateProfileData) => {
  const response = await api.put('/user/profile', data);
  
  // Update user in localStorage
  if (response.data.data.user) {
    localStorage.setItem('user', JSON.stringify(response.data.data.user));
  }
  
  return response.data;
};

/**
 * Get language preference
 */
export const getLanguagePreference = async () => {
  const response = await api.get('/user/language-preference');
  return response.data;
};

/**
 * Update language preference
 */
export const updateLanguagePreference = async (languageCode: 'en' | 'hi' | 'ml') => {
  const response = await api.put('/user/language-preference', { languageCode });
  
  // Update user in localStorage
  if (response.data.data.user) {
    localStorage.setItem('user', JSON.stringify(response.data.data.user));
  }
  
  return response.data;
};

/**
 * Get user statistics
 */
export const getUserStats = async () => {
  const response = await api.get('/users/stats');
  return response.data;
};

/**
 * Deactivate account
 */
export const deactivateAccount = async () => {
  const response = await api.delete('/users/account');
  
  // Clear local storage
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  
  return response.data;
};

/**
 * Get all workers with their skills (for Offers page)
 */
export const getAllWorkers = async () => {
  const response = await api.get('/workers');
  return response.data;
};
