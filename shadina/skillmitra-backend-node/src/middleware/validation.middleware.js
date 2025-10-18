/**
 * Validation Middleware
 * Request validation using express-validator
 */

import { validationResult } from 'express-validator';
import { ApiError } from './errorHandler.js';

/**
 * Validate request and throw error if validation fails
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg).join(', ');
    throw new ApiError(errorMessages, 400);
  }

  next();
};
