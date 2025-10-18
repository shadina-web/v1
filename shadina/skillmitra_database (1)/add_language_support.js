/**
 * MongoDB Migration Script for SkillMitra - Add Language Support
 * 
 * This script adds the 'preferredLanguage' field to all existing users
 * Default language: 'en' (English)
 * 
 * Usage:
 * 1. Make sure MongoDB is running
 * 2. Run: node add_language_support.js
 */

const { MongoClient } = require('mongodb');

// MongoDB connection settings
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DATABASE_NAME = 'skillmitra';

async function migrateDatabaseForLanguageSupport() {
  const client = new MongoClient(MONGO_URI);

  try {
    console.log('🔌 Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connected successfully!');

    const db = client.db(DATABASE_NAME);
    const usersCollection = db.collection('users');

    // Count existing users
    const totalUsers = await usersCollection.countDocuments();
    console.log(`\n📊 Found ${totalUsers} users in the database`);

    // Count users without language preference
    const usersWithoutLanguage = await usersCollection.countDocuments({
      preferredLanguage: { $exists: false }
    });

    console.log(`\n🔄 Updating ${usersWithoutLanguage} users...`);

    // Update all users without preferred_language field
    const result = await usersCollection.updateMany(
      { preferredLanguage: { $exists: false } },
      { $set: { preferredLanguage: 'en' } }
    );

    console.log(`✅ Migration completed!`);
    console.log(`   - Matched: ${result.matchedCount} users`);
    console.log(`   - Modified: ${result.modifiedCount} users`);

    // Verify the migration
    const usersWithLanguage = await usersCollection.countDocuments({
      preferredLanguage: { $exists: true }
    });

    console.log(`\n✨ Total users with language preference: ${usersWithLanguage}`);

    // Show language distribution
    const languageStats = await usersCollection.aggregate([
      { $group: { _id: '$preferredLanguage', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]).toArray();

    console.log('\n📈 Language Distribution:');
    languageStats.forEach(stat => {
      const languageName = {
        'en': 'English 🇬🇧',
        'hi': 'Hindi 🇮🇳',
        'ml': 'Malayalam 🇮🇳'
      }[stat._id] || stat._id;
      console.log(`   - ${languageName}: ${stat.count} users`);
    });

    // Show sample users
    console.log('\n👥 Sample users:');
    const sampleUsers = await usersCollection
      .find({}, { projection: { name: 1, email: 1, preferredLanguage: 1 } })
      .limit(5)
      .toArray();

    sampleUsers.forEach(user => {
      console.log(`   - ${user.name} (${user.email}): ${user.preferredLanguage}`);
    });

    console.log('\n🎉 Migration completed successfully!');
    console.log('Supported languages: en (English), hi (Hindi), ml (Malayalam)');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\n👋 Connection closed');
  }
}

// Run the migration
migrateDatabaseForLanguageSupport();
