import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../db';
import { AppError } from './errorHandler';
import { config } from '../config';

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

// Attach user info to the request object
declare global {
  namespace Express {
    interface Request {
      adminUser?: {
        username: string;
        role: string;
        permissions: string[];
        isRoot: boolean;
      };
    }
  }
}

export const protectAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const cookieHeader = req.headers.cookie;
  const cookies = parseCookies(cookieHeader);
  const apiKey = cookies.admin_api_key || req.headers['x-api-key'] as string || req.query.apiKey as string;

  if (!apiKey) {
    return next(new AppError('Unauthorized access. Invalid or missing API key.', 401));
  }

  // Root admin via env API key
  if (apiKey === config.apiKey) {
    req.adminUser = {
      username: config.adminUsername,
      role: 'super_admin',
      permissions: [
        'view_contacts', 'view_services', 'view_jobs', 'view_internships',
        'delete_records', 'manage_users',
      ],
      isRoot: true,
    };
    return next();
  }

  // Sub-admin: apiKey is stored as their DB id
  try {
    const user = await prisma.adminUser.findUnique({
      where: { id: apiKey },
      select: { id: true, username: true, role: true, permissions: true, isActive: true },
    });

    if (!user || !user.isActive) {
      return next(new AppError('Unauthorized access. Invalid or missing API key.', 401));
    }

    req.adminUser = {
      username: user.username,
      role: user.role,
      permissions: user.permissions,
      isRoot: false,
    };
    return next();
  } catch {
    return next(new AppError('Unauthorized access. Invalid or missing API key.', 401));
  }
};

// Middleware factory to guard routes by specific permission
export const requirePermission = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.adminUser) {
      return next(new AppError('Unauthorized', 401));
    }
    if (!req.adminUser.permissions.includes(permission)) {
      return next(new AppError(`Forbidden: you do not have the '${permission}' permission`, 403));
    }
    return next();
  };
};
