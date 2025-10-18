/**
 * Authentication Middleware
 * Protects routes and verifies JWT tokens
 */

import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import { ApiError, asyncHandler } from './errorHandler.js';

/**
 * Protect routes - verify JWT token
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exists
  if (!token) {
    throw new ApiError('Not authorized to access this route', 401);
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      throw new ApiError('User not found', 404);
    }

    if (!req.user.isActive) {
      throw new ApiError('User account is deactivated', 403);
    }

    // Update last active
    req.user.updateLastActive();

    next();
  } catch (error) {
    throw new ApiError('Not authorized to access this route', 401);
  }
});

/**
 * Authorize specific roles (optional - for future use)
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(
        `User role '${req.user.role}' is not authorized to access this route`,
        403
      );
    }
    next();
  };
};

/**
 * Check if user owns the resource
 */
export const checkOwnership = (model) => {
  return asyncHandler(async (req, res, next) => {
    const resource = await model.findById(req.params.id);

    if (!resource) {
      throw new ApiError('Resource not found', 404);
    }

    // Check if user owns the resource
    if (resource.user.toString() !== req.user.id && req.user.role !== 'admin') {
      throw new ApiError('Not authorized to access this resource', 403);
    }

    req.resource = resource;
    next();
  });
};
