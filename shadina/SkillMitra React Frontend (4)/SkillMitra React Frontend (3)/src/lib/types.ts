// Type definitions for SkillMitra

export interface User {
  id: string;
  name: string;
  village: string;
  phone: string;
  email?: string;
  skillsOffered: string[];
  servicesNeeded: string[];
  bio?: string;
  rating?: number;
  ratingCount?: number;
}

export interface Offer {
  id: string;
  userId: string;
  userName: string;
  village: string;
  skill: string;
  description: string;
  phone?: string;
  email?: string;
  rating?: number;
  createdAt: string;
}

export interface Request {
  id: string;
  userId: string;
  userName: string;
  village: string;
  service: string;
  description: string;
  phone?: string;
  email?: string;
  createdAt: string;
}

export interface Match {
  id: string;
  offerId?: string;
  requestId?: string;
  fromUserId: string;
  toUserId: string;
  status: 'pending' | 'accepted' | 'completed' | 'rejected';
  createdAt: string;
  rating?: number;
  comment?: string;
}

export interface FilterOptions {
  village?: string;
  skill?: string;
  search?: string;
}
