/**
 * Message Routes
 * Routes for messaging between users
 */

import express from 'express';
import { body } from 'express-validator';
import {
  getConversation,
  getConversations,
  sendMessage,
  markAsRead,
  deleteMessage,
  getUnreadCount,
  searchMessages
} from '../controllers/message.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validation.middleware.js';

const router = express.Router();

// Validation rules
const messageValidation = [
  body('receiver')
    .notEmpty()
    .withMessage('Receiver is required')
    .isMongoId()
    .withMessage('Invalid receiver ID'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Message content is required')
    .isLength({ min: 1, max: 2000 })
    .withMessage('Message must be between 1 and 2000 characters')
];

// All routes are protected
router.use(protect);

router.get('/conversations', getConversations);
router.get('/conversation/:userId', getConversation);
router.get('/unread-count', getUnreadCount);
router.get('/search', searchMessages);
router.post('/', messageValidation, validate, sendMessage);
router.patch('/:id/read', markAsRead);
router.delete('/:id', deleteMessage);

export default router;
