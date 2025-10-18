import { Offer } from '../lib/types';

// Mock village worker profiles - authentic rural Indian workers
export const mockWorkerProfiles: Offer[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Raju Kumar',
    village: 'Kaduppassery',
    skill: 'Plumber',
    description: 'Expert in pipe fitting, tap repairs, bathroom and kitchen plumbing. Available for emergency repairs. 12 years experience.',
    phone: '+91 98765 43210',
    rating: 4.7,
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Kamala Devi',
    village: 'Irinjalakuda',
    skill: 'Tailor',
    description: 'Traditional and modern stitching for sarees, churidars, blouses, and men\'s shirts. Quick alterations available.',
    phone: '+91 98765 43211',
    rating: 4.9,
    createdAt: '2024-01-16T09:15:00Z'
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Suresh Achari',
    village: 'Kodakara',
    skill: 'Carpenter',
    description: 'Wood work specialist - doors, windows, furniture repair, bed making, and custom woodwork for homes.',
    phone: '+91 98765 43212',
    rating: 4.8,
    createdAt: '2024-01-17T14:20:00Z'
  },
  {
    id: '4',
    userId: 'user4',
    userName: 'Babu Electrician',
    village: 'Chalakudy',
    skill: 'Electrician',
    description: 'House wiring, fan and light installation, electrical repairs. Licensed electrician with safety equipment.',
    phone: '+91 98765 43213',
    rating: 4.6,
    createdAt: '2024-01-18T11:00:00Z'
  },
  {
    id: '5',
    userId: 'user5',
    userName: 'Govindan Mooshari',
    village: 'Ollur',
    skill: 'Mason',
    description: 'House construction, plastering, tiling, compound wall building. 15 years experience in all masonry work.',
    phone: '+91 98765 43214',
    rating: 4.7,
    createdAt: '2024-01-19T08:45:00Z'
  },
  {
    id: '6',
    userId: 'user6',
    userName: 'Ramesh Barber',
    village: 'Kunnamkulam',
    skill: 'Barber',
    description: 'Hair cutting, shaving, beard trimming. Traditional and modern styles. Home service available on request.',
    phone: '+91 98765 43215',
    rating: 4.5,
    createdAt: '2024-01-20T07:30:00Z'
  },
  {
    id: '7',
    userId: 'user7',
    userName: 'Thankamma Amma',
    village: 'Wadakkanchery',
    skill: 'Cook',
    description: 'Traditional Kerala cooking for functions and daily meals. Sadya preparation, fish curry, and non-veg dishes.',
    phone: '+91 98765 43216',
    rating: 4.9,
    createdAt: '2024-01-21T13:15:00Z'
  },
  {
    id: '8',
    userId: 'user8',
    userName: 'Joy Driver',
    village: 'Thrissur',
    skill: 'Driver',
    description: 'Experienced driver with clean license. Available for local and long distance trips. Own car also available.',
    phone: '+91 98765 43217',
    rating: 4.6,
    createdAt: '2024-01-22T10:00:00Z'
  },
  {
    id: '9',
    userId: 'user9',
    userName: 'Krishnan Painter',
    village: 'Chavakkad',
    skill: 'Painter',
    description: 'House painting, wall putty, color washing, and waterproofing. Interior and exterior painting services.',
    phone: '+91 98765 43218',
    rating: 4.7,
    createdAt: '2024-01-23T09:30:00Z'
  },
  {
    id: '10',
    userId: 'user10',
    userName: 'Velayudhan Nair',
    village: 'Guruvayur',
    skill: 'Farmer',
    description: 'Paddy cultivation expert. Also help with kitchen garden setup, organic farming, and soil preparation.',
    phone: '+91 98765 43219',
    rating: 4.8,
    createdAt: '2024-01-24T08:00:00Z'
  },
  {
    id: '11',
    userId: 'user11',
    userName: 'Soman Mechanic',
    village: 'Kaduppassery',
    skill: 'Mechanic',
    description: 'Two-wheeler and auto mechanic. Engine repair, servicing, oil change, and brake work. Reasonable rates.',
    phone: '+91 98765 43220',
    rating: 4.5,
    createdAt: '2024-01-25T12:00:00Z'
  },
  {
    id: '12',
    userId: 'user12',
    userName: 'Lakshmanan Potter',
    village: 'Irinjalakuda',
    skill: 'Pot Maker',
    description: 'Traditional clay pot making - cooking pots, plant pots, decorative items. Custom orders accepted.',
    phone: '+91 98765 43221',
    rating: 4.8,
    createdAt: '2024-01-26T15:30:00Z'
  },
  {
    id: '13',
    userId: 'user13',
    userName: 'Xavier Fisherman',
    village: 'Chavakkad',
    skill: 'Fisherman',
    description: 'Fresh fish supply daily. River and sea fish available. Also clean and cut fish as per requirement.',
    phone: '+91 98765 43222',
    rating: 4.6,
    createdAt: '2024-01-27T11:45:00Z'
  },
  {
    id: '14',
    userId: 'user14',
    userName: 'Kunjamma Washer',
    village: 'Thrissur',
    skill: 'Laundry Service',
    description: 'Washing and ironing clothes, bed sheets, and curtains. Pick up and delivery service available.',
    phone: '+91 98765 43223',
    rating: 4.7,
    createdAt: '2024-01-28T14:00:00Z'
  },
  {
    id: '15',
    userId: 'user15',
    userName: 'Raman Thattukar',
    village: 'Ollur',
    skill: 'Gardener',
    description: 'Garden maintenance, grass cutting, tree trimming, plant care, and compound cleaning services.',
    phone: '+91 98765 43224',
    rating: 4.5,
    createdAt: '2024-01-29T07:15:00Z'
  },
  {
    id: '16',
    userId: 'user16',
    userName: 'Ummer Koya',
    village: 'Kunnamkulam',
    skill: 'Coconut Climber',
    description: 'Coconut plucking, tree cutting, and trimming. Safety equipment used. Emergency tree removal service.',
    phone: '+91 98765 43225',
    rating: 4.9,
    createdAt: '2024-01-30T16:00:00Z'
  },
  {
    id: '17',
    userId: 'user17',
    userName: 'Appukuttan Helper',
    village: 'Wadakkanchery',
    skill: 'Construction Helper',
    description: 'Experienced construction site helper. Load carrying, material mixing, and general support work.',
    phone: '+91 98765 43226',
    rating: 4.4,
    createdAt: '2024-02-01T09:00:00Z'
  },
  {
    id: '18',
    userId: 'user18',
    userName: 'Leela Beautician',
    village: 'Thrissur',
    skill: 'Beautician',
    description: 'Bridal makeup, facial, threading, mehendi, and hair styling at home. Affordable rates for all occasions.',
    phone: '+91 98765 43227',
    rating: 4.8,
    createdAt: '2024-02-02T06:30:00Z'
  },
  {
    id: '19',
    userId: 'user19',
    userName: 'Unnikrishnan Welder',
    village: 'Kodakara',
    skill: 'Welder',
    description: 'Metal gate making, grills, railings, and welding repairs. Steel fabrication work for homes and shops.',
    phone: '+91 98765 43228',
    rating: 4.6,
    createdAt: '2024-02-03T13:20:00Z'
  },
  {
    id: '20',
    userId: 'user20',
    userName: 'Valsala Teacher',
    village: 'Guruvayur',
    skill: 'Home Tutor',
    description: 'Math and Science tuition for classes 5-10. CBSE and State Board. Evening batches available.',
    phone: '+91 98765 43229',
    rating: 4.9,
    createdAt: '2024-02-04T10:45:00Z'
  },
  {
    id: '21',
    userId: 'user21',
    userName: 'Damodaran Well Digger',
    village: 'Chalakudy',
    skill: 'Well Digger',
    description: 'Well digging, deepening, and cleaning services. Also do septic tank cleaning and maintenance.',
    phone: '+91 98765 43230',
    rating: 4.7,
    createdAt: '2024-02-05T08:15:00Z'
  },
  {
    id: '22',
    userId: 'user22',
    userName: 'Shankaran Milk Vendor',
    village: 'Ollur',
    skill: 'Milk Supplier',
    description: 'Fresh cow milk delivery daily morning and evening. Own dairy farm. Pure and hygienic milk.',
    phone: '+91 98765 43231',
    rating: 4.8,
    createdAt: '2024-02-06T05:30:00Z'
  },
  {
    id: '23',
    userId: 'user23',
    userName: 'Balan Tile Worker',
    village: 'Kaduppassery',
    skill: 'Tile Mason',
    description: 'Floor and wall tiling expert. Bathroom, kitchen, and outdoor tiling. Kerala and Italian tiles.',
    phone: '+91 98765 43232',
    rating: 4.6,
    createdAt: '2024-02-07T10:00:00Z'
  },
  {
    id: '24',
    userId: 'user24',
    userName: 'Marykutty Housemaid',
    village: 'Irinjalakuda',
    skill: 'Housemaid',
    description: 'House cleaning, utensil washing, and cooking help. Daily or part-time work. Trustworthy and experienced.',
    phone: '+91 98765 43233',
    rating: 4.7,
    createdAt: '2024-02-08T07:00:00Z'
  },
  {
    id: '25',
    userId: 'user25',
    userName: 'Chandran Watchman',
    village: 'Thrissur',
    skill: 'Watchman',
    description: 'Night watchman service for houses and apartments. Reliable and alert. Police verification available.',
    phone: '+91 98765 43234',
    rating: 4.5,
    createdAt: '2024-02-09T18:00:00Z'
  }
];

// Function to get filtered mock workers
export const getFilteredMockWorkers = (filters?: {
  village?: string;
  skill?: string;
  search?: string;
}): Offer[] => {
  let filtered = [...mockWorkerProfiles];

  if (filters?.village) {
    filtered = filtered.filter(worker => 
      worker.village.toLowerCase().includes(filters.village!.toLowerCase())
    );
  }

  if (filters?.skill) {
    filtered = filtered.filter(worker => 
      worker.skill.toLowerCase().includes(filters.skill!.toLowerCase())
    );
  }

  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(worker => 
      worker.skill.toLowerCase().includes(searchLower) ||
      worker.userName.toLowerCase().includes(searchLower) ||
      worker.description.toLowerCase().includes(searchLower) ||
      worker.village.toLowerCase().includes(searchLower)
    );
  }

  return filtered;
};
