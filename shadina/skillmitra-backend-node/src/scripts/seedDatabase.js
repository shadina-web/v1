/**
 * Database Seeding Script
 * Populates the database with sample data for testing
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.model.js';
import Offer from '../models/Offer.model.js';
import Request from '../models/Request.model.js';

dotenv.config();

// Sample users
const users = [
  {
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    password: 'password123',
    phone: '9876543210',
    location: 'Thrissur, Kerala',
    bio: 'Passionate web developer looking to learn photography',
    skills: ['JavaScript', 'React', 'Node.js'],
    interests: ['Photography', 'Design'],
    preferredLanguage: 'en'
  },
  {
    name: 'Priya Sharma',
    email: 'priya@example.com',
    password: 'password123',
    phone: '9876543211',
    location: 'Thrissur, Kerala',
    bio: 'Professional photographer willing to teach in exchange for coding skills',
    skills: ['Photography', 'Photo Editing', 'Videography'],
    interests: ['Programming', 'Web Design'],
    preferredLanguage: 'hi'
  },
  {
    name: 'Arun Menon',
    email: 'arun@example.com',
    password: 'password123',
    phone: '9876543212',
    location: 'Thrissur, Kerala',
    bio: 'Guitar teacher and music enthusiast',
    skills: ['Guitar', 'Music Theory', 'Singing'],
    interests: ['Fitness', 'Cooking'],
    preferredLanguage: 'ml'
  },
  {
    name: 'Meera Das',
    email: 'meera@example.com',
    password: 'password123',
    phone: '9876543213',
    location: 'Thrissur, Kerala',
    bio: 'Yoga instructor and fitness coach',
    skills: ['Yoga', 'Meditation', 'Fitness Training'],
    interests: ['Languages', 'Music'],
    preferredLanguage: 'en'
  },
  {
    name: 'Vikram Nair',
    email: 'vikram@example.com',
    password: 'password123',
    phone: '9876543214',
    location: 'Thrissur, Kerala',
    bio: 'Graphic designer with 5 years of experience',
    skills: ['Graphic Design', 'UI/UX', 'Adobe Suite'],
    interests: ['Programming', 'Photography'],
    preferredLanguage: 'en'
  }
];

// Sample offers
const offers = [
  {
    title: 'Learn React.js from Scratch',
    description: 'I can teach you React.js fundamentals including hooks, state management, and component design. Looking for someone who can teach photography basics.',
    category: 'Programming',
    skillLevel: 'Intermediate',
    skillsOffered: ['React.js', 'JavaScript', 'Frontend Development'],
    skillsWanted: ['Photography', 'Photo Editing'],
    mode: 'Both',
    availability: {
      days: ['Monday', 'Wednesday', 'Friday'],
      timeSlots: ['6:00 PM - 8:00 PM']
    },
    duration: '1 hour per session',
    tags: ['react', 'javascript', 'web-development']
  },
  {
    title: 'Professional Photography Lessons',
    description: 'Learn photography from basics to advanced techniques. I cover composition, lighting, and post-processing. Looking to learn web development.',
    category: 'Photography',
    skillLevel: 'Advanced',
    skillsOffered: ['Photography', 'Photo Editing', 'Lightroom'],
    skillsWanted: ['Web Development', 'HTML', 'CSS'],
    mode: 'Offline',
    availability: {
      days: ['Saturday', 'Sunday'],
      timeSlots: ['10:00 AM - 12:00 PM']
    },
    duration: '2 hours per session',
    tags: ['photography', 'camera', 'editing']
  },
  {
    title: 'Guitar Lessons for Beginners',
    description: 'Teaching guitar basics, chords, and simple songs. Great for complete beginners. Looking for someone to teach me cooking.',
    category: 'Music',
    skillLevel: 'Beginner',
    skillsOffered: ['Guitar', 'Music Theory', 'Chord Reading'],
    skillsWanted: ['Cooking', 'Baking'],
    mode: 'Both',
    availability: {
      days: ['Tuesday', 'Thursday', 'Saturday'],
      timeSlots: ['4:00 PM - 6:00 PM']
    },
    duration: '1 hour per session',
    tags: ['guitar', 'music', 'lessons']
  }
];

// Sample requests
const requests = [
  {
    title: 'Need Help with Node.js Backend',
    description: 'Looking for someone experienced in Node.js and Express to help me build a REST API. I can offer graphic design services in return.',
    category: 'Programming',
    skillLevel: 'Intermediate',
    skillsWanted: ['Node.js', 'Express', 'MongoDB'],
    skillsOffered: ['Graphic Design', 'Logo Design'],
    urgency: 'High',
    mode: 'Online',
    timeframe: '2 weeks',
    tags: ['nodejs', 'backend', 'api']
  },
  {
    title: 'Learn Malayalam Language',
    description: 'Want to learn Malayalam for better communication. Can teach English or Hindi in exchange.',
    category: 'Languages',
    skillLevel: 'Beginner',
    skillsWanted: ['Malayalam'],
    skillsOffered: ['English', 'Hindi'],
    urgency: 'Medium',
    mode: 'Both',
    timeframe: 'Flexible',
    tags: ['malayalam', 'language', 'learning']
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('\n🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Offer.deleteMany({});
    await Request.deleteMany({});
    console.log('✅ Existing data cleared');

    // Create users
    console.log('\n👥 Creating users...');
    const createdUsers = await User.create(users);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Create offers (assign to users)
    console.log('\n💼 Creating offers...');
    const offersWithUsers = offers.map((offer, index) => ({
      ...offer,
      user: createdUsers[index]._id,
      location: createdUsers[index].location
    }));
    const createdOffers = await Offer.create(offersWithUsers);
    console.log(`✅ Created ${createdOffers.length} offers`);

    // Create requests (assign to users)
    console.log('\n📋 Creating requests...');
    const requestsWithUsers = requests.map((request, index) => ({
      ...request,
      user: createdUsers[index + 3]._id, // Use different users
      location: createdUsers[index + 3].location
    }));
    const createdRequests = await Request.create(requestsWithUsers);
    console.log(`✅ Created ${createdRequests.length} requests`);

    // Print summary
    console.log('\n' + '='.repeat(50));
    console.log('🎉 Database seeded successfully!');
    console.log('='.repeat(50));
    console.log('\n📊 Summary:');
    console.log(`   Users: ${createdUsers.length}`);
    console.log(`   Offers: ${createdOffers.length}`);
    console.log(`   Requests: ${createdRequests.length}`);
    
    console.log('\n👤 Sample Login Credentials:');
    console.log('   Email: rajesh@example.com');
    console.log('   Password: password123');
    console.log('\n   Email: priya@example.com');
    console.log('   Password: password123');
    console.log('='.repeat(50) + '\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
