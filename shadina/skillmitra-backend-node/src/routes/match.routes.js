/**
 * Match Routes
 * Routes for match operations
 */

import express from 'express';
import { body } from 'express-validator';
import {
  getMyMatches,
  getMatchById,
  createMatch,
  acceptMatch,
  rejectMatch,
  completeMatch,
  cancelMatch,
  addFeedback,
  addSession
} from '../controllers/match.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validation.middleware.js';

const router = express.Router();

// Validation rules
const matchValidation = [
  body('user2')
    .notEmpty()
    .withMessage('Target user is required')
    .isMongoId()
    .withMessage('Invalid user ID')
];

const feedbackValidation = [
  body('rating')
    .notEmpty()
    .withMessage('Rating is required')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Comment cannot exceed 500 characters')
];

// All routes are protected
router.use(protect);

router.get('/', getMyMatches);
router.get('/:id', getMatchById);
router.post('/', matchValidation, validate, createMatch);
router.patch('/:id/accept', acceptMatch);
router.patch('/:id/reject', rejectMatch);
router.patch('/:id/complete', completeMatch);
router.patch('/:id/cancel', cancelMatch);
router.post('/:id/feedback', feedbackValidation, validate, addFeedback);
router.post('/:id/sessions', addSession);

export default router;
