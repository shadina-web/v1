/**
 * Offer Controller
 * Handles skill offer operations
 */

import Offer from '../models/Offer.model.js';
import { ApiError, asyncHandler } from '../middleware/errorHandler.js';

/**
 * @desc    Get all offers
 * @route   GET /api/offers
 * @access  Public
 */
export const getOffers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  // Build query
  const query = { status: 'active' };

  if (req.query.category) {
    query.category = req.query.category;
  }

  if (req.query.location) {
    query.location = new RegExp(req.query.location, 'i');
  }

  if (req.query.mode) {
    query.mode = req.query.mode;
  }

  if (req.query.skillLevel) {
    query.skillLevel = req.query.skillLevel;
  }

  if (req.query.search) {
    query.$or = [
      { title: new RegExp(req.query.search, 'i') },
      { description: new RegExp(req.query.search, 'i') },
      { skillsOffered: { $in: [new RegExp(req.query.search, 'i')] } }
    ];
  }

  // Execute query
  const offers = await Offer.find(query)
    .populate('user', 'name avatar location rating reviewCount')
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 });

  const total = await Offer.countDocuments(query);

  res.status(200).json({
    status: 'success',
    results: offers.length,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    },
    data: {
      offers
    }
  });
});

/**
 * @desc    Get single offer
 * @route   GET /api/offers/:id
 * @access  Public
 */
export const getOfferById = asyncHandler(async (req, res) => {
  const offer = await Offer.findById(req.params.id)
    .populate('user', 'name avatar location rating reviewCount totalExchanges')
    .populate('interested', 'name avatar location');

  if (!offer) {
    throw new ApiError('Offer not found', 404);
  }

  // Increment views
  await offer.incrementViews();

  res.status(200).json({
    status: 'success',
    data: {
      offer
    }
  });
});

/**
 * @desc    Create new offer
 * @route   POST /api/offers
 * @access  Private
 */
export const createOffer = asyncHandler(async (req, res) => {
  const offerData = {
    ...req.body,
    user: req.user.id
  };

  const offer = await Offer.create(offerData);

  // Populate user data
  await offer.populate('user', 'name avatar location rating');

  res.status(201).json({
    status: 'success',
    message: 'Offer created successfully',
    data: {
      offer
    }
  });
});

/**
 * @desc    Update offer
 * @route   PUT /api/offers/:id
 * @access  Private
 */
export const updateOffer = asyncHandler(async (req, res) => {
  let offer = await Offer.findById(req.params.id);

  if (!offer) {
    throw new ApiError('Offer not found', 404);
  }

  // Check ownership
  if (offer.user.toString() !== req.user.id) {
    throw new ApiError('Not authorized to update this offer', 403);
  }

  // Don't allow updating user field
  delete req.body.user;
  delete req.body.views;
  delete req.body.interested;

  offer = await Offer.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  ).populate('user', 'name avatar location rating');

  res.status(200).json({
    status: 'success',
    message: 'Offer updated successfully',
    data: {
      offer
    }
  });
});

/**
 * @desc    Delete offer
 * @route   DELETE /api/offers/:id
 * @access  Private
 */
export const deleteOffer = asyncHandler(async (req, res) => {
  const offer = await Offer.findById(req.params.id);

  if (!offer) {
    throw new ApiError('Offer not found', 404);
  }

  // Check ownership
  if (offer.user.toString() !== req.user.id) {
    throw new ApiError('Not authorized to delete this offer', 403);
  }

  await offer.deleteOne();

  res.status(200).json({
    status: 'success',
    message: 'Offer deleted successfully'
  });
});

/**
 * @desc    Get user's offers
 * @route   GET /api/offers/my-offers
 * @access  Private
 */
export const getMyOffers = asyncHandler(async (req, res) => {
  const offers = await Offer.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .populate('interested', 'name avatar location');

  res.status(200).json({
    status: 'success',
    results: offers.length,
    data: {
      offers
    }
  });
});

/**
 * @desc    Mark interest in offer
 * @route   POST /api/offers/:id/interest
 * @access  Private
 */
export const markInterest = asyncHandler(async (req, res) => {
  const offer = await Offer.findById(req.params.id);

  if (!offer) {
    throw new ApiError('Offer not found', 404);
  }

  // Can't mark interest in own offer
  if (offer.user.toString() === req.user.id) {
    throw new ApiError('Cannot mark interest in your own offer', 400);
  }

  await offer.addInterest(req.user.id);

  res.status(200).json({
    status: 'success',
    message: 'Interest marked successfully',
    data: {
      offer
    }
  });
});

/**
 * @desc    Update offer status
 * @route   PATCH /api/offers/:id/status
 * @access  Private
 */
export const updateOfferStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!['active', 'paused', 'completed', 'cancelled'].includes(status)) {
    throw new ApiError('Invalid status', 400);
  }

  let offer = await Offer.findById(req.params.id);

  if (!offer) {
    throw new ApiError('Offer not found', 404);
  }

  // Check ownership
  if (offer.user.toString() !== req.user.id) {
    throw new ApiError('Not authorized to update this offer', 403);
  }

  offer.status = status;
  await offer.save();

  res.status(200).json({
    status: 'success',
    message: 'Offer status updated successfully',
    data: {
      offer
    }
  });
});
