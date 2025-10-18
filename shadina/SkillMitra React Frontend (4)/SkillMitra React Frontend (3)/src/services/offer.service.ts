/**
 * Offer API Service
 * Handles all offer-related API calls
 */

import api from './api.config';

export interface CreateOfferData {
  title: string;
  description: string;
  category: string;
  skillLevel?: string;
  skillsOffered: string[];
  skillsWanted?: string[];
  location?: string;
  mode?: 'Online' | 'Offline' | 'Both';
  availability?: {
    days: string[];
    timeSlots: string[];
  };
  duration?: string;
  tags?: string[];
}

/**
 * Get all offers with filters
 */
export const getOffers = async (params?: {
  page?: number;
  limit?: number;
  category?: string;
  location?: string;
  mode?: string;
  skillLevel?: string;
  search?: string;
}) => {
  const response = await api.get('/offers', { params });
  return response.data;
};

/**
 * Get offer by ID
 */
export const getOfferById = async (id: string) => {
  const response = await api.get(`/offers/${id}`);
  return response.data;
};

/**
 * Create new offer
 */
export const createOffer = async (data: CreateOfferData) => {
  const response = await api.post('/offers', data);
  return response.data;
};

/**
 * Update offer
 */
export const updateOffer = async (id: string, data: Partial<CreateOfferData>) => {
  const response = await api.put(`/offers/${id}`, data);
  return response.data;
};

/**
 * Delete offer
 */
export const deleteOffer = async (id: string) => {
  const response = await api.delete(`/offers/${id}`);
  return response.data;
};

/**
 * Get my offers
 */
export const getMyOffers = async () => {
  const response = await api.get('/offers/my/offers');
  return response.data;
};

/**
 * Mark interest in an offer
 */
export const markInterest = async (id: string) => {
  const response = await api.post(`/offers/${id}/interest`);
  return response.data;
};

/**
 * Update offer status
 */
export const updateOfferStatus = async (id: string, status: 'active' | 'paused' | 'completed' | 'cancelled') => {
  const response = await api.patch(`/offers/${id}/status`, { status });
  return response.data;
};
