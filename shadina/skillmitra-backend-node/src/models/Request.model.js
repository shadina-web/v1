/**
 * Request Model
 * Schema for skill requests in the SkillMitra platform
 */

import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Request title is required'],
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
    default: 'Beginner'
  },
  skillsWanted: [{
    type: String,
    required: true,
    trim: true
  }],
  skillsOffered: [{
    type: String,
    trim: true
  }],
  urgency: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    default: 'Medium'
  },
  location: {
    type: String,
    default: 'Thrissur, Kerala'
  },
  mode: {
    type: String,
    enum: ['Online', 'Offline', 'Both'],
    default: 'Both'
  },
  timeframe: {
    type: String,
    default: 'Flexible'
  },
  budget: {
    type: String,
    default: 'Skill exchange only'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'completed', 'cancelled'],
    default: 'open'
  },
  views: {
    type: Number,
    default: 0
  },
  responses: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    message: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
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
requestSchema.index({ user: 1, createdAt: -1 });
requestSchema.index({ category: 1, status: 1 });
requestSchema.index({ location: 1, status: 1 });
requestSchema.index({ urgency: 1, status: 1 });
requestSchema.index({ skillsWanted: 1 });
requestSchema.index({ status: 1, createdAt: -1 });

// ==================== Virtual Fields ====================
requestSchema.virtual('responseCount').get(function() {
  return this.responses ? this.responses.length : 0;
});

// ==================== Methods ====================
requestSchema.methods.incrementViews = async function() {
  this.views += 1;
  await this.save();
};

requestSchema.methods.addResponse = async function(userId, message) {
  this.responses.push({
    user: userId,
    message,
    createdAt: new Date()
  });
  await this.save();
};

const Request = mongoose.model('Request', requestSchema);

export default Request;
