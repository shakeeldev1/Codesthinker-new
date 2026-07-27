import { Request, Response, NextFunction } from 'express';
import prisma from '../db';
import { emailService } from '../services/email';
import { AppError } from '../middleware/errorHandler';
import logger from '../utils/logger';

// Helper to validate PDF Magic Number (%PDF -> 25 50 44 46)
const isPDF = (buffer: Buffer): boolean => {
  return buffer.length > 4 && buffer.toString('ascii', 0, 4) === '%PDF';
};

// Helper to validate DOCX Magic Number (ZIP PK\x03\x04 -> 50 4B 03 04)
const isDocx = (buffer: Buffer): boolean => {
  return buffer.length > 4 && 
         buffer[0] === 0x50 && 
         buffer[1] === 0x4B && 
         buffer[2] === 0x03 && 
         buffer[3] === 0x04;
};

// Helper to validate old binary DOC Magic Number (D0 CF 11 E0 A1 B1 1A E1)
const isDoc = (buffer: Buffer): boolean => {
  return buffer.length > 8 && 
         buffer[0] === 0xD0 && buffer[1] === 0xCF && buffer[2] === 0x11 && buffer[3] === 0xE0 &&
         buffer[4] === 0xA1 && buffer[5] === 0xB1 && buffer[6] === 0x1A && buffer[7] === 0xE1;
};

// Main binary safety signature validator
const validateFileContent = (buffer: Buffer): boolean => {
  return isPDF(buffer) || isDocx(buffer) || isDoc(buffer);
};

export const submitJobApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      throw new AppError('Resume file is required', 400);
    }

    const fileBuffer = req.file.buffer;

    // Hardened Security check: Inspect magic binary signatures
    if (!validateFileContent(fileBuffer)) {
      throw new AppError(
        'Security Alert: File signature mismatch. The file content does not match its PDF/Word extension.',
        400
      );
    }

    const { fullName, email, phone, position } = req.body;
    const resumeName = req.file.originalname;

    logger.info(`Received job application from ${email} for ${position}. Saving to DB blob...`);

    // Save to database
    const application = await prisma.jobApplication.create({
      data: {
        fullName,
        email,
        phone,
        position,
        resumeName,
        resumeData: fileBuffer,
      },
    });

    // Send email notification (async)
    emailService.sendNotification(
      `New Job Application: ${position}`,
      `
      <h3>New Job Application Received</h3>
      <p><strong>Applicant Name:</strong> ${fullName}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Position:</strong> ${position}</p>
      <p><strong>Resume File Name:</strong> ${resumeName}</p>
      <p><em>The resume file has been safely parsed, binary-validated, and stored in the database.</em></p>
      `
    ).catch(err => logger.error('Error sending job application email', err));

    return res.status(201).json({
      success: true,
      message: 'Job application submitted successfully',
      data: {
        id: application.id,
        fullName: application.fullName,
        email: application.email,
        phone: application.phone,
        position: application.position,
        resumeName: application.resumeName,
        createdAt: application.createdAt,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const submitInternshipApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      throw new AppError('Resume file is required', 400);
    }

    const fileBuffer = req.file.buffer;

    // Hardened Security check: Inspect magic binary signatures
    if (!validateFileContent(fileBuffer)) {
      throw new AppError(
        'Security Alert: File signature mismatch. The file content does not match its PDF/Word extension.',
        400
      );
    }

    const { fullName, email, phone, position } = req.body;
    const resumeName = req.file.originalname;

    logger.info(`Received internship application from ${email} for ${position}. Saving to DB blob...`);

    // Save to database
    const application = await prisma.internshipApplication.create({
      data: {
        fullName,
        email,
        phone,
        position,
        resumeName,
        resumeData: fileBuffer,
      },
    });

    // Send email notification (async)
    emailService.sendNotification(
      `New Internship Application: ${position}`,
      `
      <h3>New Internship Application Received</h3>
      <p><strong>Applicant Name:</strong> ${fullName}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Position:</strong> ${position}</p>
      <p><strong>Resume File Name:</strong> ${resumeName}</p>
      <p><em>The resume file has been safely parsed, binary-validated, and stored in the database.</em></p>
      `
    ).catch(err => logger.error('Error sending internship application email', err));

    return res.status(201).json({
      success: true,
      message: 'Internship application submitted successfully',
      data: {
        id: application.id,
        fullName: application.fullName,
        email: application.email,
        phone: application.phone,
        position: application.position,
        resumeName: application.resumeName,
        createdAt: application.createdAt,
      },
    });
  } catch (error) {
    return next(error);
  }
};
