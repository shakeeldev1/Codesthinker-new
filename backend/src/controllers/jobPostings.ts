import { Request, Response, NextFunction } from 'express';
import prisma from '../db';
import { AppError } from '../middleware/errorHandler';
import logger from '../utils/logger';

// ─────────────────── PUBLIC ROUTES ───────────────────

/** GET /api/v1/careers — public list of active job postings */
export const getPublicJobPostings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { department, category, search } = req.query as Record<string, string>;

    const where: any = { isActive: true };
    if (department && department !== 'all') where.department = department;
    if (category && category !== 'all') where.category = category;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { department: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
      ];
    }

    const postings = await prisma.jobPosting.findMany({
      where,
      select: {
        id: true,
        title: true,
        department: true,
        category: true,
        location: true,
        description: true,
        requirements: true,
        responsibilities: true,
        benefits: true,
        salaryMin: true,
        salaryMax: true,
        salaryVisible: true,
        deadline: true,
        isFeatured: true,
        createdAt: true,
        _count: { select: { applications: true } },
      },
      orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
    });

    return res.status(200).json({ success: true, data: postings });
  } catch (error) {
    return next(error);
  }
};

/** GET /api/v1/careers/:id — public single job posting */
export const getPublicJobPosting = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const posting = await prisma.jobPosting.findFirst({
      where: { id, isActive: true },
      select: {
        id: true,
        title: true,
        department: true,
        category: true,
        location: true,
        description: true,
        requirements: true,
        responsibilities: true,
        benefits: true,
        salaryMin: true,
        salaryMax: true,
        salaryVisible: true,
        deadline: true,
        isFeatured: true,
        createdAt: true,
      },
    });

    if (!posting) throw new AppError('Job posting not found', 404);
    return res.status(200).json({ success: true, data: posting });
  } catch (error) {
    return next(error);
  }
};

// ─────────────────── ADMIN ROUTES ───────────────────

/** GET /api/v1/admin/job-postings */
export const getAdminJobPostings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postings = await prisma.jobPosting.findMany({
      select: {
        id: true,
        title: true,
        department: true,
        category: true,
        location: true,
        salaryMin: true,
        salaryMax: true,
        salaryVisible: true,
        deadline: true,
        isActive: true,
        isFeatured: true,
        createdAt: true,
        updatedAt: true,
        _count: { select: { applications: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({ success: true, data: postings });
  } catch (error) {
    return next(error);
  }
};

/** GET /api/v1/admin/job-postings/:id */
export const getAdminJobPosting = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const posting = await prisma.jobPosting.findUnique({
      where: { id },
      include: {
        applications: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
            position: true,
            resumeName: true,
            coverLetter: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!posting) throw new AppError('Job posting not found', 404);
    return res.status(200).json({ success: true, data: posting });
  } catch (error) {
    return next(error);
  }
};

/** POST /api/v1/admin/job-postings */
export const createJobPosting = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title, department, category, location, description,
      requirements, responsibilities, benefits,
      salaryMin, salaryMax, salaryVisible, deadline, isActive, isFeatured,
    } = req.body;

    if (!title || !department || !category || !location || !description) {
      throw new AppError('title, department, category, location, and description are required', 400);
    }

    const posting = await prisma.jobPosting.create({
      data: {
        title,
        department,
        category,
        location,
        description,
        requirements: requirements || [],
        responsibilities: responsibilities || [],
        benefits: benefits || [],
        salaryMin: salaryMin ? Number(salaryMin) : null,
        salaryMax: salaryMax ? Number(salaryMax) : null,
        salaryVisible: Boolean(salaryVisible),
        deadline: deadline ? new Date(deadline) : null,
        isActive: isActive !== false,
        isFeatured: Boolean(isFeatured),
      },
    });

    logger.info(`Job posting created: ${title}`);
    return res.status(201).json({ success: true, data: posting });
  } catch (error) {
    return next(error);
  }
};

/** PUT /api/v1/admin/job-postings/:id */
export const updateJobPosting = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const {
      title, department, category, location, description,
      requirements, responsibilities, benefits,
      salaryMin, salaryMax, salaryVisible, deadline, isActive, isFeatured,
    } = req.body;

    const posting = await prisma.jobPosting.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(department && { department }),
        ...(category && { category }),
        ...(location && { location }),
        ...(description && { description }),
        ...(requirements !== undefined && { requirements }),
        ...(responsibilities !== undefined && { responsibilities }),
        ...(benefits !== undefined && { benefits }),
        salaryMin: salaryMin !== undefined ? (salaryMin ? Number(salaryMin) : null) : undefined,
        salaryMax: salaryMax !== undefined ? (salaryMax ? Number(salaryMax) : null) : undefined,
        ...(salaryVisible !== undefined && { salaryVisible: Boolean(salaryVisible) }),
        deadline: deadline !== undefined ? (deadline ? new Date(deadline) : null) : undefined,
        ...(isActive !== undefined && { isActive: Boolean(isActive) }),
        ...(isFeatured !== undefined && { isFeatured: Boolean(isFeatured) }),
      },
    });

    logger.info(`Job posting updated: ${id}`);
    return res.status(200).json({ success: true, data: posting });
  } catch (error: any) {
    if (error.code === 'P2025') return next(new AppError('Job posting not found', 404));
    return next(error);
  }
};

/** DELETE /api/v1/admin/job-postings/:id */
export const deleteJobPosting = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await prisma.jobPosting.delete({ where: { id } });
    logger.info(`Job posting deleted: ${id}`);
    return res.status(200).json({ success: true, message: 'Job posting deleted successfully' });
  } catch (error: any) {
    if (error.code === 'P2025') return next(new AppError('Job posting not found', 404));
    return next(error);
  }
};
