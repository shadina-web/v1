import { WorkerLocation } from '../components/LocationMap';

// Sample worker locations across Thrissur district
export const sampleWorkerLocations: WorkerLocation[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    skill: 'Plumber',
    lat: 10.5276,
    lng: 76.2144,
    rating: 4.5,
    phone: '+91 98765 43210',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    skill: 'Tailor',
    lat: 10.5851,
    lng: 76.5200,
    rating: 4.8,
    phone: '+91 98765 43211',
  },
  {
    id: '3',
    name: 'Amit Patel',
    skill: 'Carpenter',
    lat: 10.3673,
    lng: 76.2383,
    rating: 4.3,
    phone: '+91 98765 43212',
  },
  {
    id: '4',
    name: 'Sunita Devi',
    skill: 'Cook',
    lat: 10.4507,
    lng: 76.2136,
    rating: 4.9,
    phone: '+91 98765 43213',
  },
  {
    id: '5',
    name: 'Vikram Singh',
    skill: 'Painter',
    lat: 10.5369,
    lng: 76.2084,
    rating: 4.2,
    phone: '+91 98765 43214',
  },
  {
    id: '6',
    name: 'Lakshmi Menon',
    skill: 'Beautician',
    lat: 10.4673,
    lng: 76.3383,
    rating: 4.7,
    phone: '+91 98765 43215',
  },
  {
    id: '7',
    name: 'Mohammed Ali',
    skill: 'Electrician',
    lat: 10.6207,
    lng: 76.2136,
    rating: 4.6,
    phone: '+91 98765 43216',
  },
  {
    id: '8',
    name: 'Kavya Krishnan',
    skill: 'Home Tutor',
    lat: 10.4307,
    lng: 76.4836,
    rating: 4.8,
    phone: '+91 98765 43217',
  },
  {
    id: '9',
    name: 'Arjun Nair',
    skill: 'Mason',
    lat: 10.5507,
    lng: 76.1536,
    rating: 4.4,
    phone: '+91 98765 43218',
  },
  {
    id: '10',
    name: 'Deepa Thomas',
    skill: 'Catering',
    lat: 10.6807,
    lng: 76.3136,
    rating: 4.9,
    phone: '+91 98765 43219',
  },
  {
    id: '11',
    name: 'Ravi Chandran',
    skill: 'Driver',
    lat: 10.3207,
    lng: 76.3536,
    rating: 4.3,
    phone: '+91 98765 43220',
  },
  {
    id: '12',
    name: 'Anita Varghese',
    skill: 'Gardener',
    lat: 10.5107,
    lng: 76.4236,
    rating: 4.5,
    phone: '+91 98765 43221',
  },
];

// Get user's location (mock function - in production, use browser geolocation API)
export const getUserLocation = (): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve) => {
    // Check if geolocation is available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          // Default to Thrissur city center if geolocation fails
          resolve({
            lat: 10.5276,
            lng: 76.2144,
          });
        }
      );
    } else {
      // Default location (Thrissur)
      resolve({
        lat: 10.5276,
        lng: 76.2144,
      });
    }
  });
};

// Filter workers by skill
export const filterWorkersBySkill = (workers: WorkerLocation[], skill: string): WorkerLocation[] => {
  if (!skill) return workers;
  return workers.filter((worker) => 
    worker.skill.toLowerCase().includes(skill.toLowerCase())
  );
};

// Calculate distance between two points (Haversine formula)
export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Find workers within a certain radius
export const findNearbyWorkers = (
  workers: WorkerLocation[],
  userLat: number,
  userLng: number,
  radiusKm: number = 10
): WorkerLocation[] => {
  return workers.filter((worker) => {
    const distance = calculateDistance(userLat, userLng, worker.lat, worker.lng);
    return distance <= radiusKm;
  });
};
