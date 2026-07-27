import { Request, Response, NextFunction } from 'express';
import prisma from '../db';
import { emailService } from '../services/email';
import logger from '../utils/logger';

export const submitServiceInquiry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullName, email, phone, company, service, budget, timeline, message } = req.body;

    logger.info(`Received service inquiry from ${email} for ${service}`);

    // Persist to database
    const inquiry = await prisma.serviceInquiry.create({
      data: {
        fullName,
        email,
        phone,
        company,
        service,
        budget,
        timeline,
        message,
      },
    });

    // Send email notification (async)
    emailService.sendNotification(
      `New Service Inquiry: ${service}`,
      `
      <h3>New Service Inquiry Received</h3>
      <p><strong>Full Name:</strong> ${fullName}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Budget Range:</strong> ${budget || 'Not specified'}</p>
      <p><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>
      <p><strong>Project Details:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      `
    ).catch(err => logger.error('Error sending service email', err));

    return res.status(201).json({
      success: true,
      message: 'Service inquiry submitted successfully',
      data: inquiry,
    });
  } catch (error) {
    return next(error);
  }
};
