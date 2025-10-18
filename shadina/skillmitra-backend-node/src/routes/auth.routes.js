/**
 * Authentication Routes
 * Routes for user authentication
 */

import express from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  getMe,
  updatePassword,
  logout
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validation.middleware.js';

const router = express.Router();

// Validation rules
const registerValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('phone')
    .optional()
    .matches(/^[0-9]{10}$/)
    .withMessage('Phone must be a valid 10-digit number'),
  body('preferredLanguage')
    .optional()
    .isIn(['en', 'hi', 'ml'])
    .withMessage('Language must be en, hi, or ml')
];

const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const updatePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .notEmpty()
    .withMessage('New password is required')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long')
];

// Public routes
router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/update-password', protect, updatePasswordValidation, validate, updatePassword);
router.post('/logout', protect, logout);

export default router;
