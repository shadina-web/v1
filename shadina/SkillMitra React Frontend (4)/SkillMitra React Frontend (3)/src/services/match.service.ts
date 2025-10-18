/**
 * Match API Service
 * Handles all match-related API calls
 */

import api from './api.config';

export interface CreateMatchData {
  user2: string;
  offer?: string;
  request?: string;
  matchScore?: number;
}

/**
 * Get all my matches
 */
export const getMyMatches = async () => {
  const response = await api.get('/matches');
  return response.data;
};

/**
 * Get match by ID
 */
export const getMatchById = async (id: string) => {
  const response = await api.get(`/matches/${id}`);
  return response.data;
};

/**
 * Create new match
 */
export const createMatch = async (data: CreateMatchData) => {
  const response = await api.post('/matches', data);
  return response.data;
};

/**
 * Accept match
 */
export const acceptMatch = async (id: string) => {
  const response = await api.patch(`/matches/${id}/accept`);
  return response.data;
};

/**
 * Reject match
 */
export const rejectMatch = async (id: string) => {
  const response = await api.patch(`/matches/${id}/reject`);
  return response.data;
};

/**
 * Complete match
 */
export const completeMatch = async (id: string) => {
  const response = await api.patch(`/matches/${id}/complete`);
  return response.data;
};

/**
 * Cancel match
 */
export const cancelMatch = async (id: string, reason?: string) => {
  const response = await api.patch(`/matches/${id}/cancel`, { reason });
  return response.data;
};

/**
 * Add feedback to match
 */
export const addFeedback = async (id: string, rating: number, comment?: string) => {
  const response = await api.post(`/matches/${id}/feedback`, { rating, comment });
  return response.data;
};

/**
 * Add session to match
 */
export const addSession = async (id: string, sessionData: any) => {
  const response = await api.post(`/matches/${id}/sessions`, sessionData);
  return response.data;
};
