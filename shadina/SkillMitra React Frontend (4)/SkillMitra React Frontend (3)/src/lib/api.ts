// Mock API layer for SkillMitra
import { User, Offer, Request, Match, FilterOptions } from './types';
import { mockWorkerProfiles, getFilteredMockWorkers } from '../utils/mockWorkerData';

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    village: 'Kadupussery',
    phone: '+91 98765 43210',
    email: 'rajesh@example.com',
    skillsOffered: ['Plumbing', 'Electrical Work'],
    servicesNeeded: ['Carpentry'],
    bio: 'Experienced plumber and electrician with 10 years of experience.',
    rating: 4.5,
    ratingCount: 12
  },
  {
    id: '2',
    name: 'Priya Sharma',
    village: 'Kodakara',
    phone: '+91 98765 43211',
    email: 'priya@example.com',
    skillsOffered: ['Tailoring', 'Embroidery'],
    servicesNeeded: ['Catering'],
    bio: 'Skilled tailor specializing in traditional and modern designs.',
    rating: 4.8,
    ratingCount: 25
  },
  {
    id: '3',
    name: 'Amit Patel',
    village: 'Irinjalakuda',
    phone: '+91 98765 43212',
    skillsOffered: ['Carpentry', 'Furniture Making'],
    servicesNeeded: ['Painting'],
    bio: 'Custom furniture maker with attention to detail.',
    rating: 4.3,
    ratingCount: 8
  },
  {
    id: '4',
    name: 'Sunita Devi',
    village: 'Aloor',
    phone: '+91 98765 43213',
    skillsOffered: ['Cooking', 'Catering'],
    servicesNeeded: ['Cleaning'],
    bio: 'Professional cook for events and daily meals.',
    rating: 4.9,
    ratingCount: 30
  },
  {
    id: '5',
    name: 'Vikram Singh',
    village: 'Koratty',
    phone: '+91 98765 43214',
    skillsOffered: ['Painting', 'Whitewashing'],
    servicesNeeded: ['Plumbing'],
    bio: 'House painter with 5 years experience.',
    rating: 4.2,
    ratingCount: 15
  }
];

const mockOffers: Offer[] = [...mockWorkerProfiles]; // Use comprehensive worker profiles

const mockRequests: Request[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Rajesh Kumar',
    village: 'Kadupussery',
    service: 'Carpentry',
    description: 'Need a carpenter to build custom kitchen cabinets.',
    phone: '+91 98765 43210',
    createdAt: '2025-10-01T10:00:00Z'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Priya Sharma',
    village: 'Kodakara',
    service: 'Catering',
    description: 'Looking for caterer for a family function (50 people).',
    phone: '+91 98765 43211',
    createdAt: '2025-10-02T11:00:00Z'
  },
  {
    id: '3',
    userId: '3',
    userName: 'Amit Patel',
    village: 'Irinjalakuda',
    service: 'Painting',
    description: 'Need house painting for 3 rooms.',
    phone: '+91 98765 43212',
    createdAt: '2025-10-03T09:00:00Z'
  },
  {
    id: '4',
    userId: '5',
    userName: 'Vikram Singh',
    village: 'Koratty',
    service: 'Plumbing',
    description: 'Bathroom plumbing needs repair urgently.',
    phone: '+91 98765 43214',
    createdAt: '2025-10-05T10:00:00Z'
  }
];

let currentUser: User | null = null;
let mockMatches: Match[] = [];

// Helper to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API functions
export const api = {
  // Offers
  async getOffers(filters?: FilterOptions): Promise<Offer[]> {
    await delay(500);
    let filtered = [...mockOffers];
    
    if (filters?.village) {
      filtered = filtered.filter(o => o.village.toLowerCase().includes(filters.village!.toLowerCase()));
    }
    if (filters?.skill) {
      filtered = filtered.filter(o => o.skill.toLowerCase().includes(filters.skill!.toLowerCase()));
    }
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(o => 
        o.skill.toLowerCase().includes(search) ||
        o.description.toLowerCase().includes(search) ||
        o.userName.toLowerCase().includes(search)
      );
    }
    
    return filtered;
  },

  async getOffer(id: string): Promise<Offer | null> {
    await delay(300);
    return mockOffers.find(o => o.id === id) || null;
  },

  async createOffer(offer: Omit<Offer, 'id' | 'createdAt'>): Promise<Offer> {
    await delay(500);
    const newOffer: Offer = {
      ...offer,
      id: String(mockOffers.length + 1),
      createdAt: new Date().toISOString()
    };
    mockOffers.push(newOffer);
    return newOffer;
  },

  // Requests
  async getRequests(filters?: FilterOptions): Promise<Request[]> {
    await delay(500);
    let filtered = [...mockRequests];
    
    if (filters?.village) {
      filtered = filtered.filter(r => r.village.toLowerCase().includes(filters.village!.toLowerCase()));
    }
    if (filters?.skill) {
      filtered = filtered.filter(r => r.service.toLowerCase().includes(filters.skill!.toLowerCase()));
    }
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(r => 
        r.service.toLowerCase().includes(search) ||
        r.description.toLowerCase().includes(search) ||
        r.userName.toLowerCase().includes(search)
      );
    }
    
    return filtered;
  },

  async getRequest(id: string): Promise<Request | null> {
    await delay(300);
    return mockRequests.find(r => r.id === id) || null;
  },

  async createRequest(request: Omit<Request, 'id' | 'createdAt'>): Promise<Request> {
    await delay(500);
    const newRequest: Request = {
      ...request,
      id: String(mockRequests.length + 1),
      createdAt: new Date().toISOString()
    };
    mockRequests.push(newRequest);
    return newRequest;
  },

  // Profile
  async getProfile(): Promise<User | null> {
    await delay(300);
    return currentUser;
  },

  async updateProfile(user: User): Promise<User> {
    await delay(500);
    currentUser = user;
    return user;
  },

  async createProfile(user: Omit<User, 'id'>): Promise<User> {
    await delay(500);
    const newUser: User = {
      ...user,
      id: String(mockUsers.length + 1)
    };
    currentUser = newUser;
    mockUsers.push(newUser);
    return newUser;
  },

  // Matches
  async createMatch(match: Omit<Match, 'id' | 'createdAt'>): Promise<Match> {
    await delay(500);
    const newMatch: Match = {
      ...match,
      id: String(mockMatches.length + 1),
      createdAt: new Date().toISOString()
    };
    mockMatches.push(newMatch);
    return newMatch;
  },

  async getMatches(): Promise<Match[]> {
    await delay(300);
    return mockMatches;
  },

  async updateMatch(id: string, updates: Partial<Match>): Promise<Match> {
    await delay(500);
    const match = mockMatches.find(m => m.id === id);
    if (!match) throw new Error('Match not found');
    Object.assign(match, updates);
    return match;
  },

  // Auth (mock)
  async login(phone: string): Promise<User | null> {
    await delay(500);
    const user = mockUsers.find(u => u.phone === phone);
    if (user) {
      currentUser = user;
    }
    return user || null;
  },

  async logout(): Promise<void> {
    await delay(300);
    currentUser = null;
  }
};

// Skills and villages for autocomplete - Village/Rural focused
export const SKILLS = [
  'Plumber',
  'Tailor',
  'Carpenter',
  'Electrician',
  'Mason',
  'Barber',
  'Cook',
  'Driver',
  'Painter',
  'Farmer',
  'Mechanic',
  'Pot Maker',
  'Fisherman',
  'Laundry Service',
  'Gardener',
  'Coconut Climber',
  'Construction Helper',
  'Beautician',
  'Welder',
  'Home Tutor',
  'Well Digger',
  'Milk Supplier',
  'Tile Mason',
  'Housemaid',
  'Watchman'
];

export const VILLAGES = [
  'Kaduppassery',
  'Irinjalakuda',
  'Kodakara',
  'Thrissur',
  'Ollur',
  'Kunnamkulam',
  'Wadakkanchery',
  'Chavakkad',
  'Guruvayur',
  'Chalakudy'
];
