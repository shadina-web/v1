/**
 * Request Controller
 * Handles skill request operations
 */

import Request from '../models/Request.model.js';
import { ApiError, asyncHandler } from '../middleware/errorHandler.js';

/**
 * @desc    Get all requests
 * @route   GET /api/requests
 * @access  Public
 */
export const getRequests = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  // Build query
  const query = { status: 'open' };

  if (req.query.category) {
    query.category = req.query.category;
  }

  if (req.query.location) {
    query.location = new RegExp(req.query.location, 'i');
  }

  if (req.query.urgency) {
    query.urgency = req.query.urgency;
  }

  if (req.query.mode) {
    query.mode = req.query.mode;
  }

  if (req.query.search) {
    query.$or = [
      { title: new RegExp(req.query.search, 'i') },
      { description: new RegExp(req.query.search, 'i') },
      { skillsWanted: { $in: [new RegExp(req.query.search, 'i')] } }
    ];
  }

  // Execute query
  const requests = await Request.find(query)
    .populate('user', 'name avatar location rating reviewCount')
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 });

  const total = await Request.countDocuments(query);

  res.status(200).json({
    status: 'success',
    results: requests.length,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    },
    data: {
      requests
    }
  });
});

/**
 * @desc    Get single request
 * @route   GET /api/requests/:id
 * @access  Public
 */
export const getRequestById = asyncHandler(async (req, res) => {
  const request = await Request.findById(req.params.id)
    .populate('user', 'name avatar location rating reviewCount totalExchanges')
    .populate('responses.user', 'name avatar location rating');

  if (!request) {
    throw new ApiError('Request not found', 404);
  }

  // Increment views
  await request.incrementViews();

  res.status(200).json({
    status: 'success',
    data: {
      request
    }
  });
});

/**
 * @desc    Create new request
 * @route   POST /api/requests
 * @access  Private
 */
export const createRequest = asyncHandler(async (req, res) => {
  const requestData = {
    ...req.body,
    user: req.user.id
  };

  const request = await Request.create(requestData);

  // Populate user data
  await request.populate('user', 'name avatar location rating');

  res.status(201).json({
    status: 'success',
    message: 'Request created successfully',
    data: {
      request
    }
  });
});

/**
 * @desc    Update request
 * @route   PUT /api/requests/:id
 * @access  Private
 */
export const updateRequest = asyncHandler(async (req, res) => {
  let request = await Request.findById(req.params.id);

  if (!request) {
    throw new ApiError('Request not found', 404);
  }

  // Check ownership
  if (request.user.toString() !== req.user.id) {
    throw new ApiError('Not authorized to update this request', 403);
  }

  // Don't allow updating certain fields
  delete req.body.user;
  delete req.body.views;
  delete req.body.responses;

  request = await Request.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  ).populate('user', 'name avatar location rating');

  res.status(200).json({
    status: 'success',
    message: 'Request updated successfully',
    data: {
      request
    }
  });
});

/**
 * @desc    Delete request
 * @route   DELETE /api/requests/:id
 * @access  Private
 */
export const deleteRequest = asyncHandler(async (req, res) => {
  const request = await Request.findById(req.params.id);

  if (!request) {
    throw new ApiError('Request not found', 404);
  }

  // Check ownership
  if (request.user.toString() !== req.user.id) {
    throw new ApiError('Not authorized to delete this request', 403);
  }

  await request.deleteOne();

  res.status(200).json({
    status: 'success',
    message: 'Request deleted successfully'
  });
});

/**
 * @desc    Get user's requests
 * @route   GET /api/requests/my-requests
 * @access  Private
 */
export const getMyRequests = asyncHandler(async (req, res) => {
  const requests = await Request.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .populate('responses.user', 'name avatar location rating');

  res.status(200).json({
    status: 'success',
    results: requests.length,
    data: {
      requests
    }
  });
});

/**
 * @desc    Add response to request
 * @route   POST /api/requests/:id/respond
 * @access  Private
 */
export const addResponse = asyncHandler(async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim().length === 0) {
    throw new ApiError('Response message is required', 400);
  }

  const request = await Request.findById(req.params.id);

  if (!request) {
    throw new ApiError('Request not found', 404);
  }

  // Can't respond to own request
  if (request.user.toString() === req.user.id) {
    throw new ApiError('Cannot respond to your own request', 400);
  }

  // Check if already responded
  const alreadyResponded = request.responses.some(
    response => response.user.toString() === req.user.id
  );

  if (alreadyResponded) {
    throw new ApiError('You have already responded to this request', 400);
  }

  await request.addResponse(req.user.id, message);

  // Populate the response
  await request.populate('responses.user', 'name avatar location rating');

  res.status(200).json({
    status: 'success',
    message: 'Response added successfully',
    data: {
      request
    }
  });
});

/**
 * @desc    Update request status
 * @route   PATCH /api/requests/:id/status
 * @access  Private
 */
export const updateRequestStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!['open', 'in-progress', 'completed', 'cancelled'].includes(status)) {
    throw new ApiError('Invalid status', 400);
  }

  let request = await Request.findById(req.params.id);

  if (!request) {
    throw new ApiError('Request not found', 404);
  }

  // Check ownership
  if (request.user.toString() !== req.user.id) {
    throw new ApiError('Not authorized to update this request', 403);
  }

  request.status = status;
  await request.save();

  res.status(200).json({
    status: 'success',
    message: 'Request status updated successfully',
    data: {
      request
    }
  });
});
