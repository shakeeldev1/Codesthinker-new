import { Request, Response, NextFunction } from 'express';
import prisma from '../db';
import { AppError } from '../middleware/errorHandler';
import logger from '../utils/logger';
import { config } from '../config';

export const getSubmissionsOverview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const contactCount = await prisma.contactSubmission.count();
    const serviceInquiryCount = await prisma.serviceInquiry.count();
    const jobCount = await prisma.jobApplication.count();
    const internshipCount = await prisma.internshipApplication.count();

    return res.status(200).json({
      success: true,
      counts: {
        contacts: contactCount,
        serviceInquiries: serviceInquiryCount,
        jobApplications: jobCount,
        internshipApplications: internshipCount,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const getContactSubmissions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const list = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.status(200).json({ success: true, data: list });
  } catch (error) {
    return next(error);
  }
};

export const getServiceInquiries = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const list = await prisma.serviceInquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.status(200).json({ success: true, data: list });
  } catch (error) {
    return next(error);
  }
};

export const getJobApplications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Exclude raw resumeData bytes from listing queries to keep payloads light
    const list = await prisma.jobApplication.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        position: true,
        resumeName: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return res.status(200).json({ success: true, data: list });
  } catch (error) {
    return next(error);
  }
};

export const getInternshipApplications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Exclude raw resumeData bytes from listing queries to keep payloads light
    const list = await prisma.internshipApplication.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        position: true,
        resumeName: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return res.status(200).json({ success: true, data: list });
  } catch (error) {
    return next(error);
  }
};

export const downloadResume = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { type, id } = req.params;

    // Validate type
    if (type !== 'jobs' && type !== 'internships') {
      throw new AppError('Invalid resume type', 400);
    }

    logger.info(`Admin downloading resume of type ${type} with database ID: ${id}`);

    if (type === 'jobs') {
      const record = await prisma.jobApplication.findUnique({
        where: { id },
      });
      if (!record) {
        throw new AppError('Resume record not found', 404);
      }
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename="${record.resumeName}"`);
      return res.send(record.resumeData);
    } else {
      const record = await prisma.internshipApplication.findUnique({
        where: { id },
      });
      if (!record) {
        throw new AppError('Resume record not found', 404);
      }
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename="${record.resumeName}"`);
      return res.send(record.resumeData);
    }
  } catch (error) {
    return next(error);
  }
};

export const loginAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, rememberMe } = req.body;

    if (!username || !password) {
      throw new AppError('Username and password are required', 400);
    }

    if (username !== config.adminUsername || password !== config.adminPassword) {
      throw new AppError('Invalid credentials', 401);
    }

    const isProd = config.nodeEnv === 'production';
    const cookieOptions: any = {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      path: '/',
    };

    if (rememberMe) {
      cookieOptions.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
    }

    res.cookie('admin_api_key', config.apiKey, cookieOptions);

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully',
    });
  } catch (error) {
    return next(error);
  }
};

export const logoutAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isProd = config.nodeEnv === 'production';
    res.clearCookie('admin_api_key', {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      path: '/',
    });
    return res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteContactSubmission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await prisma.contactSubmission.delete({
      where: { id },
    });
    return res.status(200).json({
      success: true,
      message: 'Contact submission deleted successfully',
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteServiceInquiry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await prisma.serviceInquiry.delete({
      where: { id },
    });
    return res.status(200).json({
      success: true,
      message: 'Service inquiry deleted successfully',
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteJobApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await prisma.jobApplication.delete({
      where: { id },
    });
    return res.status(200).json({
      success: true,
      message: 'Job application deleted successfully',
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteInternshipApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await prisma.internshipApplication.delete({
      where: { id },
    });
    return res.status(200).json({
      success: true,
      message: 'Internship application deleted successfully',
    });
  } catch (error) {
    return next(error);
  }
};
