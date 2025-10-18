/**
 * Request Routes
 * Routes for skill requests
 */

import express from 'express';
import { body } from 'express-validator';
import {
  getRequests,
  getRequestById,
  createRequest,
  updateRequest,
  deleteRequest,
  getMyRequests,
  addResponse,
  updateRequestStatus
} from '../controllers/request.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validation.middleware.js';

const router = express.Router();

// Validation rules
const requestValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 20, max: 1000 })
    .withMessage('Description must be between 20 and 1000 characters'),
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn([
      'Programming', 'Design', 'Music', 'Languages', 'Cooking',
      'Fitness', 'Photography', 'Writing', 'Marketing', 'Teaching',
      'Crafts', 'Other'
    ])
    .withMessage('Invalid category'),
  body('skillsWanted')
    .isArray({ min: 1 })
    .withMessage('At least one skill must be requested'),
  body('mode')
    .optional()
    .isIn(['Online', 'Offline', 'Both'])
    .withMessage('Mode must be Online, Offline, or Both')
];

const responseValidation = [
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Response message is required')
    .isLength({ min: 10, max: 500 })
    .withMessage('Message must be between 10 and 500 characters')
];

// Public routes
router.get('/', getRequests);
router.get('/:id', getRequestById);

// Protected routes
router.post('/', protect, requestValidation, validate, createRequest);
router.put('/:id', protect, requestValidation, validate, updateRequest);
router.delete('/:id', protect, deleteRequest);
router.get('/my/requests', protect, getMyRequests);
router.post('/:id/respond', protect, responseValidation, validate, addResponse);
router.patch('/:id/status', protect, updateRequestStatus);

export default router;
