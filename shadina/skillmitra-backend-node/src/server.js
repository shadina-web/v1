/**
 * SkillMitra Backend Server
 * Main entry point for the Express + MongoDB application
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';

// Import routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import offerRoutes from './routes/offer.routes.js';
import requestRoutes from './routes/request.routes.js';
import matchRoutes from './routes/match.routes.js';
import messageRoutes from './routes/message.routes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ==================== Middleware ====================

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Logging middleware (only in development)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ==================== Routes ====================

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'SkillMitra API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/messages', messageRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler (must be last)
app.use(errorHandler);

// ==================== Database & Server Startup ====================

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Start Express server
    app.listen(PORT, () => {
      console.log('\n' + '='.repeat(50));
      console.log('🚀 SkillMitra Backend Server Started!');
      console.log('='.repeat(50));
      console.log(`📡 Server running on: http://localhost:${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
      console.log(`🎯 Client URL: ${process.env.CLIENT_URL}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log('='.repeat(50) + '\n');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('💥 Unhandled Rejection! Shutting down...');
  console.error(err);
  process.exit(1);
});

// Start the server
startServer();

export default app;
