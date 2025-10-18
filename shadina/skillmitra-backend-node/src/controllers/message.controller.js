/**
 * Message Controller
 * Handles messaging between users
 */

import Message from '../models/Message.model.js';
import { ApiError, asyncHandler } from '../middleware/errorHandler.js';

/**
 * @desc    Get conversation between two users
 * @route   GET /api/messages/conversation/:userId
 * @access  Private
 */
export const getConversation = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const skip = (page - 1) * limit;

  const messages = await Message.getConversation(
    req.user.id,
    userId,
    limit,
    skip
  );

  // Mark messages as read
  await Message.markConversationAsRead(userId, req.user.id);

  res.status(200).json({
    status: 'success',
    results: messages.length,
    data: {
      messages: messages.reverse() // Reverse to show oldest first
    }
  });
});

/**
 * @desc    Get all conversations for current user
 * @route   GET /api/messages/conversations
 * @access  Private
 */
export const getConversations = asyncHandler(async (req, res) => {
  // Get unique users the current user has conversed with
  const messages = await Message.aggregate([
    {
      $match: {
        $or: [{ sender: req.user._id }, { receiver: req.user._id }],
        deletedBy: { $nin: [req.user._id] }
      }
    },
    {
      $sort: { createdAt: -1 }
    },
    {
      $group: {
        _id: {
          $cond: [
            { $eq: ['$sender', req.user._id] },
            '$receiver',
            '$sender'
          ]
        },
        lastMessage: { $first: '$$ROOT' },
        unreadCount: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ['$receiver', req.user._id] },
                  { $eq: ['$isRead', false] }
                ]
              },
              1,
              0
            ]
          }
        }
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $unwind: '$user'
    },
    {
      $project: {
        user: {
          _id: 1,
          name: 1,
          avatar: 1,
          lastActive: 1
        },
        lastMessage: {
          content: 1,
          createdAt: 1,
          isRead: 1
        },
        unreadCount: 1
      }
    },
    {
      $sort: { 'lastMessage.createdAt': -1 }
    }
  ]);

  res.status(200).json({
    status: 'success',
    results: messages.length,
    data: {
      conversations: messages
    }
  });
});

/**
 * @desc    Send message
 * @route   POST /api/messages
 * @access  Private
 */
export const sendMessage = asyncHandler(async (req, res) => {
  const { receiver, content, match, messageType, attachments } = req.body;

  if (!receiver || !content) {
    throw new ApiError('Receiver and content are required', 400);
  }

  // Can't send message to yourself
  if (receiver === req.user.id) {
    throw new ApiError('Cannot send message to yourself', 400);
  }

  const message = await Message.create({
    sender: req.user.id,
    receiver,
    content,
    match,
    messageType: messageType || 'text',
    attachments: attachments || []
  });

  // Populate sender and receiver
  await message.populate('sender receiver', 'name avatar');

  res.status(201).json({
    status: 'success',
    message: 'Message sent successfully',
    data: {
      message
    }
  });
});

/**
 * @desc    Mark message as read
 * @route   PATCH /api/messages/:id/read
 * @access  Private
 */
export const markAsRead = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    throw new ApiError('Message not found', 404);
  }

  // Only receiver can mark as read
  if (message.receiver.toString() !== req.user.id) {
    throw new ApiError('Not authorized to mark this message as read', 403);
  }

  await message.markAsRead();

  res.status(200).json({
    status: 'success',
    message: 'Message marked as read'
  });
});

/**
 * @desc    Delete message
 * @route   DELETE /api/messages/:id
 * @access  Private
 */
export const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    throw new ApiError('Message not found', 404);
  }

  // Only sender or receiver can delete
  if (
    message.sender.toString() !== req.user.id &&
    message.receiver.toString() !== req.user.id
  ) {
    throw new ApiError('Not authorized to delete this message', 403);
  }

  await message.deleteForUser(req.user.id);

  res.status(200).json({
    status: 'success',
    message: 'Message deleted successfully'
  });
});

/**
 * @desc    Get unread message count
 * @route   GET /api/messages/unread-count
 * @access  Private
 */
export const getUnreadCount = asyncHandler(async (req, res) => {
  const count = await Message.getUnreadCount(req.user.id);

  res.status(200).json({
    status: 'success',
    data: {
      unreadCount: count
    }
  });
});

/**
 * @desc    Search messages
 * @route   GET /api/messages/search
 * @access  Private
 */
export const searchMessages = asyncHandler(async (req, res) => {
  const { query, userId } = req.query;

  if (!query) {
    throw new ApiError('Search query is required', 400);
  }

  const searchCriteria = {
    $or: [
      { sender: req.user.id },
      { receiver: req.user.id }
    ],
    content: new RegExp(query, 'i'),
    deletedBy: { $nin: [req.user.id] }
  };

  // Filter by specific user if provided
  if (userId) {
    searchCriteria.$or = [
      { sender: req.user.id, receiver: userId },
      { sender: userId, receiver: req.user.id }
    ];
  }

  const messages = await Message.find(searchCriteria)
    .populate('sender receiver', 'name avatar')
    .sort({ createdAt: -1 })
    .limit(50);

  res.status(200).json({
    status: 'success',
    results: messages.length,
    data: {
      messages
    }
  });
});
