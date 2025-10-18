/**
 * Message Model
 * Schema for messages between users in the SkillMitra platform
 */

import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match'
  },
  content: {
    type: String,
    required: [true, 'Message content is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  messageType: {
    type: String,
    enum: ['text', 'image', 'file', 'system'],
    default: 'text'
  },
  attachments: [{
    fileName: String,
    fileUrl: String,
    fileType: String,
    fileSize: Number
  }],
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: Date,
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// ==================== Indexes ====================
messageSchema.index({ sender: 1, receiver: 1, createdAt: -1 });
messageSchema.index({ receiver: 1, isRead: 1 });
messageSchema.index({ match: 1, createdAt: 1 });
messageSchema.index({ createdAt: -1 });

// ==================== Methods ====================
messageSchema.methods.markAsRead = async function() {
  if (!this.isRead) {
    this.isRead = true;
    this.readAt = new Date();
    await this.save();
  }
};

messageSchema.methods.deleteForUser = async function(userId) {
  if (!this.deletedBy.includes(userId)) {
    this.deletedBy.push(userId);
    
    // If both users deleted, mark as deleted
    if (this.deletedBy.length === 2) {
      this.isDeleted = true;
    }
    
    await this.save();
  }
};

// ==================== Statics ====================
messageSchema.statics.getConversation = async function(user1Id, user2Id, limit = 50, skip = 0) {
  return this.find({
    $or: [
      { sender: user1Id, receiver: user2Id },
      { sender: user2Id, receiver: user1Id }
    ],
    deletedBy: { $nin: [user1Id] }
  })
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .populate('sender', 'name avatar')
    .populate('receiver', 'name avatar');
};

messageSchema.statics.getUnreadCount = async function(userId) {
  return this.countDocuments({
    receiver: userId,
    isRead: false,
    deletedBy: { $nin: [userId] }
  });
};

messageSchema.statics.markConversationAsRead = async function(senderId, receiverId) {
  return this.updateMany(
    {
      sender: senderId,
      receiver: receiverId,
      isRead: false
    },
    {
      isRead: true,
      readAt: new Date()
    }
  );
};

const Message = mongoose.model('Message', messageSchema);

export default Message;
