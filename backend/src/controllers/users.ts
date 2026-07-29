import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../db';
import { AppError } from '../middleware/errorHandler';
import logger from '../utils/logger';
import { config } from '../config';

export const ALL_PERMISSIONS = [
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

// Ensure an initial super admin user exists in DB
export const ensureDefaultAdmin = async () => {
  try {
    const count = await prisma.adminUser.count();
    if (count === 0) {
      const initialUsername = config.adminUsername || 'codesthinker_admin';
      const initialPassword = config.adminPassword || 'admin123456';
      const hashedPassword = await bcrypt.hash(initialPassword, 12);
      
      const admin = await prisma.adminUser.create({
        data: {
          username: initialUsername,
          email: 'root@codesthinker.com',
          password: hashedPassword,
          role: 'super_admin',
          permissions: ALL_PERMISSIONS,
          isActive: true,
        },
      });
      logger.info(`Default admin user seeded in DB: ${admin.username}`);
      return admin;
    }
  } catch (err) {
    logger.error('Failed to ensure default admin user:', err);
  }
};

export const getAdminUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ensureDefaultAdmin();

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

    return res.status(200).json({
      success: true,
      data: users,
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
    let { id } = req.params;
    const { username, email, role, permissions: customPerms, isActive, password } = req.body;

    if (role && !['super_admin', 'editor', 'viewer', 'custom'].includes(role)) {
      throw new AppError('Invalid role', 400);
    }

    const permissions =
      role === 'custom'
        ? (customPerms || []).filter((p: string) => ALL_PERMISSIONS.includes(p))
        : (ROLE_PERMISSIONS[role] || ALL_PERMISSIONS);

    // If id is 'root', map to actual DB super admin user if found
    if (id === 'root') {
      await ensureDefaultAdmin();
      const rootDbUser = await prisma.adminUser.findFirst({
        where: { OR: [{ role: 'super_admin' }, { username: config.adminUsername }] },
      });
      if (rootDbUser) {
        id = rootDbUser.id;
      }
    }

    const updateData: any = {
      ...(username && { username }),
      ...(email && { email }),
      ...(role && { role }),
      permissions,
      ...(typeof isActive === 'boolean' && { isActive }),
    };

    if (password && password.length >= 8) {
      updateData.password = await bcrypt.hash(password, 12);
    }

    const user = await prisma.adminUser.update({
      where: { id },
      data: updateData,
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
    let { id } = req.params;

    if (id === 'root') {
      const rootDbUser = await prisma.adminUser.findFirst({
        where: { OR: [{ role: 'super_admin' }, { username: config.adminUsername }] },
      });
      if (rootDbUser) {
        id = rootDbUser.id;
      }
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
    let { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 8) {
      throw new AppError('New password must be at least 8 characters', 400);
    }

    if (id === 'root') {
      const rootDbUser = await prisma.adminUser.findFirst({
        where: { OR: [{ role: 'super_admin' }, { username: config.adminUsername }] },
      });
      if (rootDbUser) {
        id = rootDbUser.id;
      }
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
