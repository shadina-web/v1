/**
 * Offer Routes
 * Routes for skill offers
 */

import express from 'express';
import { body } from 'express-validator';
import {
  getOffers,
  getOfferById,
  createOffer,
  updateOffer,
  deleteOffer,
  getMyOffers,
  markInterest,
  updateOfferStatus
} from '../controllers/offer.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validation.middleware.js';

const router = express.Router();

// Validation rules
const offerValidation = [
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
  body('skillsOffered')
    .isArray({ min: 1 })
    .withMessage('At least one skill must be offered'),
  body('mode')
    .optional()
    .isIn(['Online', 'Offline', 'Both'])
    .withMessage('Mode must be Online, Offline, or Both')
];

// Public routes
router.get('/', getOffers);
router.get('/:id', getOfferById);

// Protected routes
router.post('/', protect, offerValidation, validate, createOffer);
router.put('/:id', protect, offerValidation, validate, updateOffer);
router.delete('/:id', protect, deleteOffer);
router.get('/my/offers', protect, getMyOffers);
router.post('/:id/interest', protect, markInterest);
router.patch('/:id/status', protect, updateOfferStatus);

export default router;
