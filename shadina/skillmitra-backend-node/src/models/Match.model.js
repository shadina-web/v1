/**
 * Match Model
 * Schema for matches between users in the SkillMitra platform
 */

import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  offer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offer'
  },
  request: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Request'
  },
  matchScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
    default: 'pending'
  },
  initiatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  acceptedAt: Date,
  completedAt: Date,
  cancelledAt: Date,
  cancellationReason: String,
  skillsExchanged: {
    user1Skills: [String],
    user2Skills: [String]
  },
  feedback: {
    user1Feedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comment: String,
      createdAt: Date
    },
    user2Feedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comment: String,
      createdAt: Date
    }
  },
  sessions: [{
    scheduledAt: Date,
    completedAt: Date,
    duration: Number, // in minutes
    mode: {
      type: String,
      enum: ['Online', 'Offline']
    },
    notes: String
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// ==================== Indexes ====================
matchSchema.index({ user1: 1, user2: 1 });
matchSchema.index({ user1: 1, status: 1 });
matchSchema.index({ user2: 1, status: 1 });
matchSchema.index({ status: 1, createdAt: -1 });
matchSchema.index({ offer: 1 });
matchSchema.index({ request: 1 });

// ==================== Virtuals ====================
matchSchema.virtual('sessionCount').get(function() {
  return this.sessions ? this.sessions.length : 0;
});

matchSchema.virtual('isCompleted').get(function() {
  return this.status === 'completed';
});

// ==================== Methods ====================
matchSchema.methods.accept = async function() {
  this.status = 'accepted';
  this.acceptedAt = new Date();
  await this.save();
};

matchSchema.methods.complete = async function() {
  this.status = 'completed';
  this.completedAt = new Date();
  await this.save();
};

matchSchema.methods.cancel = async function(reason) {
  this.status = 'cancelled';
  this.cancelledAt = new Date();
  this.cancellationReason = reason;
  await this.save();
};

matchSchema.methods.addSession = async function(sessionData) {
  this.sessions.push(sessionData);
  await this.save();
};

matchSchema.methods.addFeedback = async function(userId, rating, comment) {
  const feedbackData = {
    rating,
    comment,
    createdAt: new Date()
  };

  if (userId.toString() === this.user1.toString()) {
    this.feedback.user1Feedback = feedbackData;
  } else if (userId.toString() === this.user2.toString()) {
    this.feedback.user2Feedback = feedbackData;
  }

  await this.save();
};

const Match = mongoose.model('Match', matchSchema);

export default Match;
