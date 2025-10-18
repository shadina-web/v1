/**
 * Offer Model
 * Schema for skill offers in the SkillMitra platform
 */

import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Offer title is required'],
    trim: true,
    minlength: [5, 'Title must be at least 5 characters long'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [20, 'Description must be at least 20 characters long'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Programming',
      'Design',
      'Music',
      'Languages',
      'Cooking',
      'Fitness',
      'Photography',
      'Writing',
      'Marketing',
      'Teaching',
      'Crafts',
      'Other'
    ]
  },
  skillLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    default: 'Intermediate'
  },
  skillsOffered: [{
    type: String,
    trim: true
  }],
  skillsWanted: [{
    type: String,
    trim: true
  }],
  location: {
    type: String,
    default: 'Thrissur, Kerala'
  },
  mode: {
    type: String,
    enum: ['Online', 'Offline', 'Both'],
    default: 'Both'
  },
  availability: {
    days: [{
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }],
    timeSlots: [{
      type: String // e.g., "9:00 AM - 12:00 PM"
    }]
  },
  duration: {
    type: String,
    default: '1 hour per session'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'paused', 'completed', 'cancelled'],
    default: 'active'
  },
  views: {
    type: Number,
    default: 0
  },
  interested: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// ==================== Indexes ====================
offerSchema.index({ user: 1, createdAt: -1 });
offerSchema.index({ category: 1, status: 1 });
offerSchema.index({ location: 1, status: 1 });
offerSchema.index({ skillsOffered: 1 });
offerSchema.index({ status: 1, createdAt: -1 });

// ==================== Virtual Fields ====================
offerSchema.virtual('interestCount').get(function() {
  return this.interested ? this.interested.length : 0;
});

// ==================== Methods ====================
offerSchema.methods.incrementViews = async function() {
  this.views += 1;
  await this.save();
};

offerSchema.methods.addInterest = async function(userId) {
  if (!this.interested.includes(userId)) {
    this.interested.push(userId);
    await this.save();
  }
};

const Offer = mongoose.model('Offer', offerSchema);

export default Offer;
