/**
 * Request API Service
 * Handles all request-related API calls
 */

import api from './api.config';

export interface CreateRequestData {
  title: string;
  description: string;
  category: string;
  skillLevel?: string;
  skillsWanted: string[];
  skillsOffered?: string[];
  urgency?: 'Low' | 'Medium' | 'High' | 'Urgent';
  location?: string;
  mode?: 'Online' | 'Offline' | 'Both';
  timeframe?: string;
  budget?: string;
  tags?: string[];
}

/**
 * Get all requests with filters
 */
export const getRequests = async (params?: {
  page?: number;
  limit?: number;
  category?: string;
  location?: string;
  urgency?: string;
  mode?: string;
  search?: string;
}) => {
  const response = await api.get('/requests', { params });
  return response.data;
};

/**
 * Get request by ID
 */
export const getRequestById = async (id: string) => {
  const response = await api.get(`/requests/${id}`);
  return response.data;
};

/**
 * Create new request
 */
export const createRequest = async (data: CreateRequestData) => {
  const response = await api.post('/requests', data);
  return response.data;
};

/**
 * Update request
 */
export const updateRequest = async (id: string, data: Partial<CreateRequestData>) => {
  const response = await api.put(`/requests/${id}`, data);
  return response.data;
};

/**
 * Delete request
 */
export const deleteRequest = async (id: string) => {
  const response = await api.delete(`/requests/${id}`);
  return response.data;
};

/**
 * Get my requests
 */
export const getMyRequests = async () => {
  const response = await api.get('/requests/my/requests');
  return response.data;
};

/**
 * Add response to a request
 */
export const addResponse = async (id: string, message: string) => {
  const response = await api.post(`/requests/${id}/respond`, { message });
  return response.data;
};

/**
 * Update request status
 */
export const updateRequestStatus = async (id: string, status: 'open' | 'in-progress' | 'completed' | 'cancelled') => {
  const response = await api.patch(`/requests/${id}/status`, { status });
  return response.data;
};
