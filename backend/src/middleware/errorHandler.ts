import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'An unexpected error occurred';

  logger.error(`API Error: [${req.method}] ${req.url}`, err);

  // Handle Multer upload errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'File size too large. Maximum allowed size is 5MB.',
    });
  }

  // Handle Prisma / Database Error Messages safely without exposing stack traces or file paths
  if (err.message && (err.message.includes('prisma') || err.message.includes('Invocation') || err.code?.startsWith('P'))) {
    if (req.url.includes('/admin/login')) {
      message = 'Invalid username or password';
      statusCode = 401;
    } else {
      message = 'A database error occurred. Please try again.';
      statusCode = 500;
    }
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
