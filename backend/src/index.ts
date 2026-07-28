import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config';
import apiRouter from './routes/api';
import { errorHandler } from './middleware/errorHandler';
import logger from './utils/logger';

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://codesthinker-rouge.vercel.app',
  'https://codesthinker.com',
];

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, postman, or server-to-server)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || config.nodeEnv !== 'production') {
      return callback(null, true);
    }
    
    return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-KEY', 'Cookie'],
  credentials: true,
}));

// Body Parsing Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logging
app.use((req, res, next) => {
  logger.info(`[${req.method}] ${req.url}`);
  next();
});

// API Routes
app.use('/api/v1', apiRouter);

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// Route Not Found Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Resource not found: [${req.method}] ${req.url}`,
  });
});

// Global Error Handler
app.use(errorHandler);

// Start Server (Only if not running inside Vercel Serverless environment)
if (!process.env.VERCEL) {
  app.listen(config.port, () => {
    logger.info(`Server is running in ${config.nodeEnv} mode on port ${config.port}`);
  });
}

export default app;
