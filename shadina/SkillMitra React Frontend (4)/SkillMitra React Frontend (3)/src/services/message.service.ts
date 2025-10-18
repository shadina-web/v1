/**
 * Message API Service
 * Handles all messaging-related API calls
 */

import api from './api.config';

export interface SendMessageData {
  receiver: string;
  content: string;
  match?: string;
  messageType?: 'text' | 'image' | 'file' | 'system';
  attachments?: any[];
}

/**
 * Get all conversations
 */
export const getConversations = async () => {
  const response = await api.get('/messages/conversations');
  return response.data;
};

/**
 * Get conversation with a specific user
 */
export const getConversation = async (userId: string, params?: {
  page?: number;
  limit?: number;
}) => {
  const response = await api.get(`/messages/conversation/${userId}`, { params });
  return response.data;
};

/**
 * Send message
 */
export const sendMessage = async (data: SendMessageData) => {
  const response = await api.post('/messages', data);
  return response.data;
};

/**
 * Mark message as read
 */
export const markAsRead = async (id: string) => {
  const response = await api.patch(`/messages/${id}/read`);
  return response.data;
};

/**
 * Delete message
 */
export const deleteMessage = async (id: string) => {
  const response = await api.delete(`/messages/${id}`);
  return response.data;
};

/**
 * Get unread message count
 */
export const getUnreadCount = async () => {
  const response = await api.get('/messages/unread-count');
  return response.data;
};

/**
 * Search messages
 */
export const searchMessages = async (query: string, userId?: string) => {
  const response = await api.get('/messages/search', {
    params: { query, userId }
  });
  return response.data;
};
