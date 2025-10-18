/**
 * Match Controller
 * Handles matching operations between users
 */

import Match from '../models/Match.model.js';
import User from '../models/User.model.js';
import { ApiError, asyncHandler } from '../middleware/errorHandler.js';

/**
 * @desc    Get all matches for current user
 * @route   GET /api/matches
 * @access  Private
 */
export const getMyMatches = asyncHandler(async (req, res) => {
  const matches = await Match.find({
    $or: [{ user1: req.user.id }, { user2: req.user.id }]
  })
    .populate('user1', 'name avatar location rating')
    .populate('user2', 'name avatar location rating')
    .populate('offer', 'title category')
    .populate('request', 'title category')
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    results: matches.length,
    data: {
      matches
    }
  });
});

/**
 * @desc    Get single match
 * @route   GET /api/matches/:id
 * @access  Private
 */
export const getMatchById = asyncHandler(async (req, res) => {
  const match = await Match.findById(req.params.id)
    .populate('user1', 'name avatar location rating skills')
    .populate('user2', 'name avatar location rating skills')
    .populate('offer', 'title description category skillsOffered')
    .populate('request', 'title description category skillsWanted');

  if (!match) {
    throw new ApiError('Match not found', 404);
  }

  // Check authorization
  if (
    match.user1._id.toString() !== req.user.id &&
    match.user2._id.toString() !== req.user.id
  ) {
    throw new ApiError('Not authorized to view this match', 403);
  }

  res.status(200).json({
    status: 'success',
    data: {
      match
    }
  });
});

/**
 * @desc    Create new match
 * @route   POST /api/matches
 * @access  Private
 */
export const createMatch = asyncHandler(async (req, res) => {
  const { user2, offer, request, matchScore } = req.body;

  // Validate user2 exists
  const targetUser = await User.findById(user2);
  if (!targetUser) {
    throw new ApiError('Target user not found', 404);
  }

  // Can't match with yourself
  if (user2 === req.user.id) {
    throw new ApiError('Cannot create match with yourself', 400);
  }

  // Check if match already exists
  const existingMatch = await Match.findOne({
    $or: [
      { user1: req.user.id, user2: user2 },
      { user1: user2, user2: req.user.id }
    ],
    status: { $in: ['pending', 'accepted'] }
  });

  if (existingMatch) {
    throw new ApiError('Match already exists with this user', 400);
  }

  const match = await Match.create({
    user1: req.user.id,
    user2,
    offer,
    request,
    matchScore: matchScore || 0,
    initiatedBy: req.user.id
  });

  // Populate user data
  await match.populate('user1 user2', 'name avatar location rating');

  res.status(201).json({
    status: 'success',
    message: 'Match created successfully',
    data: {
      match
    }
  });
});

/**
 * @desc    Accept match
 * @route   PATCH /api/matches/:id/accept
 * @access  Private
 */
export const acceptMatch = asyncHandler(async (req, res) => {
  const match = await Match.findById(req.params.id);

  if (!match) {
    throw new ApiError('Match not found', 404);
  }

  // Check authorization (user2 must accept)
  if (match.user2.toString() !== req.user.id) {
    throw new ApiError('Only the matched user can accept this match', 403);
  }

  if (match.status !== 'pending') {
    throw new ApiError('Match is not in pending status', 400);
  }

  await match.accept();

  res.status(200).json({
    status: 'success',
    message: 'Match accepted successfully',
    data: {
      match
    }
  });
});

/**
 * @desc    Reject match
 * @route   PATCH /api/matches/:id/reject
 * @access  Private
 */
export const rejectMatch = asyncHandler(async (req, res) => {
  const match = await Match.findById(req.params.id);

  if (!match) {
    throw new ApiError('Match not found', 404);
  }

  // Check authorization
  if (
    match.user1.toString() !== req.user.id &&
    match.user2.toString() !== req.user.id
  ) {
    throw new ApiError('Not authorized to reject this match', 403);
  }

  if (match.status !== 'pending') {
    throw new ApiError('Match is not in pending status', 400);
  }

  match.status = 'rejected';
  await match.save();

  res.status(200).json({
    status: 'success',
    message: 'Match rejected',
    data: {
      match
    }
  });
});

/**
 * @desc    Complete match
 * @route   PATCH /api/matches/:id/complete
 * @access  Private
 */
export const completeMatch = asyncHandler(async (req, res) => {
  const match = await Match.findById(req.params.id);

  if (!match) {
    throw new ApiError('Match not found', 404);
  }

  // Check authorization
  if (
    match.user1.toString() !== req.user.id &&
    match.user2.toString() !== req.user.id
  ) {
    throw new ApiError('Not authorized to complete this match', 403);
  }

  if (match.status !== 'accepted') {
    throw new ApiError('Match must be accepted before completing', 400);
  }

  await match.complete();

  // Update user total exchanges
  await User.findByIdAndUpdate(match.user1, { $inc: { totalExchanges: 1 } });
  await User.findByIdAndUpdate(match.user2, { $inc: { totalExchanges: 1 } });

  res.status(200).json({
    status: 'success',
    message: 'Match completed successfully',
    data: {
      match
    }
  });
});

/**
 * @desc    Cancel match
 * @route   PATCH /api/matches/:id/cancel
 * @access  Private
 */
export const cancelMatch = asyncHandler(async (req, res) => {
  const { reason } = req.body;

  const match = await Match.findById(req.params.id);

  if (!match) {
    throw new ApiError('Match not found', 404);
  }

  // Check authorization
  if (
    match.user1.toString() !== req.user.id &&
    match.user2.toString() !== req.user.id
  ) {
    throw new ApiError('Not authorized to cancel this match', 403);
  }

  await match.cancel(reason || 'No reason provided');

  res.status(200).json({
    status: 'success',
    message: 'Match cancelled',
    data: {
      match
    }
  });
});

/**
 * @desc    Add feedback to match
 * @route   POST /api/matches/:id/feedback
 * @access  Private
 */
export const addFeedback = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    throw new ApiError('Rating must be between 1 and 5', 400);
  }

  const match = await Match.findById(req.params.id);

  if (!match) {
    throw new ApiError('Match not found', 404);
  }

  // Check authorization
  if (
    match.user1.toString() !== req.user.id &&
    match.user2.toString() !== req.user.id
  ) {
    throw new ApiError('Not authorized to add feedback to this match', 403);
  }

  if (match.status !== 'completed') {
    throw new ApiError('Match must be completed to add feedback', 400);
  }

  await match.addFeedback(req.user.id, rating, comment);

  // Update receiver's rating
  const receiverId =
    match.user1.toString() === req.user.id ? match.user2 : match.user1;

  const receiver = await User.findById(receiverId);
  const totalRating = receiver.rating * receiver.reviewCount + rating;
  receiver.reviewCount += 1;
  receiver.rating = totalRating / receiver.reviewCount;
  await receiver.save();

  res.status(200).json({
    status: 'success',
    message: 'Feedback added successfully',
    data: {
      match
    }
  });
});

/**
 * @desc    Add session to match
 * @route   POST /api/matches/:id/sessions
 * @access  Private
 */
export const addSession = asyncHandler(async (req, res) => {
  const sessionData = req.body;

  const match = await Match.findById(req.params.id);

  if (!match) {
    throw new ApiError('Match not found', 404);
  }

  // Check authorization
  if (
    match.user1.toString() !== req.user.id &&
    match.user2.toString() !== req.user.id
  ) {
    throw new ApiError('Not authorized to add session to this match', 403);
  }

  await match.addSession(sessionData);

  res.status(200).json({
    status: 'success',
    message: 'Session added successfully',
    data: {
      match
    }
  });
});
