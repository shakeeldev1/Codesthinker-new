import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../db';
import { AppError } from '../middleware/errorHandler';
import logger from '../utils/logger';
import { config } from '../config';

const ALL_PERMISSIONS = [
  'view_contacts',
  'view_services',
  'view_jobs',
  'view_internships',
  'delete_records',
  'manage_users',
];

const ROLE_PERMISSIONS: Record<string, string[]> = {
  super_admin: [...ALL_PERMISSIONS],
  editor: ['view_contacts', 'view_services', 'view_jobs', 'view_internships', 'delete_records'],
  viewer: ['view_contacts', 'view_services', 'view_jobs', 'view_internships'],
  custom: [],
};

export const getAdminUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.adminUser.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        permissions: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Prepend the root super admin (from env) as a non-deletable entry
    const rootAdmin = {
      id: 'root',
      username: config.adminUsername,
      email: 'root@codesthinker.com',
      role: 'super_admin',
      permissions: ALL_PERMISSIONS,
      isActive: true,
      createdAt: new Date(0).toISOString(),
      updatedAt: new Date(0).toISOString(),
      isRoot: true,
    };

    return res.status(200).json({
      success: true,
      data: [rootAdmin, ...users],
    });
  } catch (error) {
    return next(error);
  }
};

export const createAdminUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password, role, permissions: customPerms } = req.body;

    if (!username || !email || !password || !role) {
      throw new AppError('username, email, password, and role are required', 400);
    }

    if (!['super_admin', 'editor', 'viewer', 'custom'].includes(role)) {
      throw new AppError('Invalid role. Must be super_admin, editor, viewer, or custom', 400);
    }

    // Resolve permissions based on role
    const permissions =
      role === 'custom'
        ? (customPerms || []).filter((p: string) => ALL_PERMISSIONS.includes(p))
        : ROLE_PERMISSIONS[role];

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.adminUser.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role,
        permissions,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        permissions: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    logger.info(`New admin user created: ${username} (${role})`);
    return res.status(201).json({ success: true, data: user });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return next(new AppError('A user with that username or email already exists', 409));
    }
    return next(error);
  }
};

export const updateAdminUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { username, email, role, permissions: customPerms, isActive } = req.body;

    if (!['super_admin', 'editor', 'viewer', 'custom'].includes(role)) {
      throw new AppError('Invalid role', 400);
    }

    const permissions =
      role === 'custom'
        ? (customPerms || []).filter((p: string) => ALL_PERMISSIONS.includes(p))
        : ROLE_PERMISSIONS[role];

    const user = await prisma.adminUser.update({
      where: { id },
      data: {
        ...(username && { username }),
        ...(email && { email }),
        role,
        permissions,
        ...(typeof isActive === 'boolean' && { isActive }),
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        permissions: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    logger.info(`Admin user updated: ${user.username}`);
    return res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return next(new AppError('User not found', 404));
    }
    if (error.code === 'P2002') {
      return next(new AppError('Username or email already in use', 409));
    }
    return next(error);
  }
};

export const deleteAdminUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (id === 'root') {
      throw new AppError('Cannot delete the root super admin', 403);
    }

    await prisma.adminUser.delete({ where: { id } });

    logger.info(`Admin user deleted: ${id}`);
    return res.status(200).json({ success: true, message: 'Admin user deleted successfully' });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return next(new AppError('User not found', 404));
    }
    return next(error);
  }
};

export const resetAdminUserPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 8) {
      throw new AppError('New password must be at least 8 characters', 400);
    }

    if (id === 'root') {
      throw new AppError('Root admin password must be changed via environment variables', 403);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.adminUser.update({
      where: { id },
      data: { password: hashedPassword },
    });

    logger.info(`Password reset for admin user: ${id}`);
    return res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return next(new AppError('User not found', 404));
    }
    return next(error);
  }
};
