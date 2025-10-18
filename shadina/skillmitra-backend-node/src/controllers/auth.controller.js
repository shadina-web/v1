/**
 * Authentication Controller
 * Handles user registration, login, and authentication
 */

import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import { ApiError, asyncHandler } from '../middleware/errorHandler.js';

/**
 * Generate JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone, location, preferredLanguage } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new ApiError('User already exists with this email', 400);
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    phone,
    location,
    preferredLanguage: preferredLanguage || 'en'
  });

  // Generate token
  const token = generateToken(user._id);

  res.status(201).json({
    status: 'success',
    message: 'User registered successfully',
    data: {
      user: user.getPublicProfile(),
      token
    }
  });
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    throw new ApiError('Please provide email and password', 400);
  }

  // Find user and include password
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new ApiError('Invalid credentials', 401);
  }

  // Check password
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError('Invalid credentials', 401);
  }

  // Check if user is active
  if (!user.isActive) {
    throw new ApiError('Your account has been deactivated', 403);
  }

  // Update last active
  await user.updateLastActive();

  // Generate token
  const token = generateToken(user._id);

  res.status(200).json({
    status: 'success',
    message: 'Login successful',
    data: {
      user: user.getPublicProfile(),
      token
    }
  });
});

/**
 * @desc    Get current logged in user
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    status: 'success',
    data: {
      user: user.getPublicProfile()
    }
  });
});

/**
 * @desc    Update user password
 * @route   PUT /api/auth/update-password
 * @access  Private
 */
export const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new ApiError('Please provide current password and new password', 400);
  }

  // Get user with password
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  const isPasswordCorrect = await user.comparePassword(currentPassword);

  if (!isPasswordCorrect) {
    throw new ApiError('Current password is incorrect', 401);
  }

  // Update password
  user.password = newPassword;
  await user.save();

  // Generate new token
  const token = generateToken(user._id);

  res.status(200).json({
    status: 'success',
    message: 'Password updated successfully',
    data: {
      token
    }
  });
});

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Private
 */
export const logout = asyncHandler(async (req, res) => {
  // In JWT authentication, logout is handled client-side by removing the token
  // But we can update last active time
  await req.user.updateLastActive();

  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully'
  });
});
