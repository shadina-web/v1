/**
 * User Routes
 * Routes for user operations
 */

import express from 'express';
import { body } from 'express-validator';
import {
  getUsers,
  getUserById,
  updateProfile,
  getLanguagePreference,
  updateLanguagePreference,
  deactivateAccount,
  getUserStats
} from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validation.middleware.js';

const router = express.Router();

// Validation rules
const updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('phone')
    .optional()
    .matches(/^[0-9]{10}$/)
    .withMessage('Phone must be a valid 10-digit number'),
  body('bio')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Bio cannot exceed 500 characters'),
  body('skills')
    .optional()
    .isArray()
    .withMessage('Skills must be an array'),
  body('interests')
    .optional()
    .isArray()
    .withMessage('Interests must be an array')
];

const languagePreferenceValidation = [
  body('languageCode')
    .notEmpty()
    .withMessage('Language code is required')
    .isIn(['en', 'hi', 'ml'])
    .withMessage('Language code must be en, hi, or ml')
];

// Public routes
router.get('/', getUsers);
router.get('/:id', getUserById);

// Protected routes
router.put('/profile', protect, updateProfileValidation, validate, updateProfile);
router.get('/language-preference', protect, getLanguagePreference);
router.put('/language-preference', protect, languagePreferenceValidation, validate, updateLanguagePreference);
router.delete('/account', protect, deactivateAccount);
router.get('/stats', protect, getUserStats);

export default router;
