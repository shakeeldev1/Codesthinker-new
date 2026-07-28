import { Request, Response, NextFunction } from 'express';
import { config } from '../config';
import { AppError } from './errorHandler';

const parseCookies = (cookieHeader: string | undefined): Record<string, string> => {
  const list: Record<string, string> = {};
  if (!cookieHeader) return list;

  cookieHeader.split(';').forEach((cookie) => {
    const parts = cookie.split('=');
    const name = parts[0].trim();
    const val = parts.slice(1).join('=');
    if (name) {
      list[name] = decodeURIComponent(val);
    }
  });
  return list;
};

export const protectAdmin = (req: Request, res: Response, next: NextFunction) => {
  const cookieHeader = req.headers.cookie;
  const cookies = parseCookies(cookieHeader);
  const apiKey = cookies.admin_api_key || req.headers['x-api-key'] || req.query.apiKey;

  if (!apiKey || apiKey !== config.apiKey) {
    return next(new AppError('Unauthorized access. Invalid or missing API key.', 401));
  }

  next();
};
