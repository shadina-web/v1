// MongoDB Migration Script for SkillMitra Multilingual Support
// Run this script using: mongosh < migration_add_language_support.js

// Connect to your database
use skillmitra;

print("Starting migration: Adding language support to users collection...");

// Update all existing users to have preferred_language field
// Default to 'en' (English) for existing users
db.users.updateMany(
  { preferred_language: { $exists: false } },
  { $set: { preferred_language: "en" } }
);

print("✅ Migration completed successfully!");
print("All existing users now have preferred_language = 'en'");

// Verify the migration
var count = db.users.countDocuments({ preferred_language: { $exists: true } });
print("Total users with language preference: " + count);

// Show sample users
print("\nSample users:");
db.users.find({}, { name: 1, email: 1, preferred_language: 1 }).limit(5).forEach(printjson);

print("\n✨ Language support is ready!");
print("Supported languages: en (English), hi (Hindi), ml (Malayalam)");
