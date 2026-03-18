/**
 * Main Express Server
 */

import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import testCaseRoutes from './routes/testCaseRoutes';
import { logger } from './utils/logger';

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Increase timeout for long-running LLM inference requests
app.use((req: Request, res: Response, next: NextFunction) => {
  req.setTimeout(300000); // 5 minutes
  next();
});
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api', testCaseRoutes);

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'LocalLLMTestGenBuddy API',
    version: '1.0.0',
    description: 'Backend API for generating test cases using local LLMs',
    endpoints: {
      health: 'GET /api/health',
      generateTestCases: 'POST /api/generate-testcases',
      getProviders: 'GET /api/providers',
      testProvider: 'POST /api/test-provider',
      configureProvider: 'POST /api/configure-provider',
    },
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path,
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Unhandled error:', err.message);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start server
const server = app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
  logger.info(`📝 LLM Provider: ${process.env.LLM_PROVIDER || 'ollama'}`);
  logger.info(`🤖 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  logger.info('Shutting down gracefully...');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

export default app;
