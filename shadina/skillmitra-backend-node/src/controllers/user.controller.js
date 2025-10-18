/**
 * User Controller
 * Handles user-related operations
 */

import User from '../models/User.model.js';
import { ApiError, asyncHandler } from '../middleware/errorHandler.js';

/**
 * @desc    Get all users (with pagination and filters)
 * @route   GET /api/users
 * @access  Public
 */
export const getUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Build query
  const query = { isActive: true };

  if (req.query.location) {
    query.location = new RegExp(req.query.location, 'i');
  }

  if (req.query.skills) {
    query.skills = { $in: req.query.skills.split(',') };
  }

  if (req.query.search) {
    query.$or = [
      { name: new RegExp(req.query.search, 'i') },
      { bio: new RegExp(req.query.search, 'i') }
    ];
  }

  // Execute query
  const users = await User.find(query)
    .select('-password')
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 });

  const total = await User.countDocuments(query);

  res.status(200).json({
    status: 'success',
    results: users.length,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    },
    data: {
      users
    }
  });
});

/**
 * @desc    Get single user by ID
 * @route   GET /api/users/:id
 * @access  Public
 */
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    throw new ApiError('User not found', 404);
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const allowedUpdates = [
    'name',
    'phone',
    'location',
    'bio',
    'avatar',
    'skills',
    'interests',
    'preferredLanguage'
  ];

  const updates = {};
  Object.keys(req.body).forEach(key => {
    if (allowedUpdates.includes(key)) {
      updates[key] = req.body[key];
    }
  });

  const user = await User.findByIdAndUpdate(
    req.user.id,
    updates,
    {
      new: true,
      runValidators: true
    }
  ).select('-password');

  res.status(200).json({
    status: 'success',
    message: 'Profile updated successfully',
    data: {
      user
    }
  });
});

/**
 * @desc    Get user's language preference
 * @route   GET /api/users/language-preference
 * @access  Private
 */
export const getLanguagePreference = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('preferredLanguage');

  res.status(200).json({
    status: 'success',
    data: {
      languageCode: user.preferredLanguage
    }
  });
});

/**
 * @desc    Update user's language preference
 * @route   PUT /api/users/language-preference
 * @access  Private
 */
export const updateLanguagePreference = asyncHandler(async (req, res) => {
  const { languageCode } = req.body;

  if (!['en', 'hi', 'ml'].includes(languageCode)) {
    throw new ApiError('Invalid language code. Must be: en, hi, or ml', 400);
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { preferredLanguage: languageCode },
    { new: true, runValidators: true }
  ).select('-password');

  res.status(200).json({
    status: 'success',
    message: 'Language preference updated successfully',
    data: {
      user
    }
  });
});

/**
 * @desc    Deactivate user account
 * @route   DELETE /api/users/account
 * @access  Private
 */
export const deactivateAccount = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { isActive: false });

  res.status(200).json({
    status: 'success',
    message: 'Account deactivated successfully'
  });
});

/**
 * @desc    Get user statistics
 * @route   GET /api/users/stats
 * @access  Private
 */
export const getUserStats = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  const stats = {
    totalExchanges: user.totalExchanges,
    rating: user.rating,
    reviewCount: user.reviewCount,
    memberSince: user.createdAt,
    lastActive: user.lastActive
  };

  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
});
