// Indian Profile Images - Using Unsplash API for diverse Indian faces
// These are free to use images of Indian people

export const indianProfileImages = {
  men: [
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces',
  ],
  women: [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=faces',
  ],
  workers: [
    // Indian professionals and service workers
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1581092918484-8313e1f7e8a6?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=400&fit=crop',
  ],
  services: [
    // Various service categories
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop', // Carpentry
    'https://images.unsplash.com/photo-1581578949510-fa7315c4c350?w=600&h=400&fit=crop', // Plumbing
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop', // Electrical
    'https://images.unsplash.com/photo-1556228578-dd6c1e0d748e?w=600&h=400&fit=crop', // Teaching
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop', // Technology
  ],
};

// Get a random profile image
export function getRandomProfileImage(gender: 'men' | 'women' = 'men'): string {
  const images = indianProfileImages[gender];
  return images[Math.floor(Math.random() * images.length)];
}

// Get profile image by index (for consistent user avatars)
export function getProfileImage(gender: 'men' | 'women', index: number): string {
  const images = indianProfileImages[gender];
  return images[index % images.length];
}

// Get service category image
export function getServiceImage(category: string): string {
  const categoryMap: { [key: string]: number } = {
    'carpentry': 0,
    'plumbing': 1,
    'electrical': 2,
    'teaching': 3,
    'technology': 4,
    'default': 0,
  };
  
  const index = categoryMap[category.toLowerCase()] ?? categoryMap.default;
  return indianProfileImages.services[index];
}

// Generate initials avatar with Indian-friendly colors
export function getInitialsAvatar(name: string): { initials: string; color: string } {
  const names = name.trim().split(' ');
  const initials = names.length > 1
    ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
    : names[0].substring(0, 2).toUpperCase();

  const colors = [
    'bg-purple-500',
    'bg-pink-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-orange-500',
    'bg-teal-500',
  ];

  const colorIndex = name.charCodeAt(0) % colors.length;
  return { initials, color: colors[colorIndex] };
}
