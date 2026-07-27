import { Request, Response, NextFunction } from 'express';
import prisma from '../db';
import { emailService } from '../services/email';
import logger from '../utils/logger';

export const submitContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, phone, email, subject, message } = req.body;

    logger.info(`Received contact submission from ${email}`);

    // Persist to database
    const submission = await prisma.contactSubmission.create({
      data: {
        firstName,
        lastName,
        phone,
        email,
        subject,
        message,
      },
    });

    // Send email notification (async)
    emailService.sendNotification(
      `New Contact Message: ${subject}`,
      `
      <h3>New Contact Message Received</h3>
      <p><strong>Name:</strong> ${firstName}</p>
      <p><strong>Company/Last Name:</strong> ${lastName}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      `
    ).catch(err => logger.error('Error sending contact email', err));

    return res.status(201).json({
      success: true,
      message: 'Contact inquiry submitted successfully',
      data: submission,
    });
  } catch (error) {
    return next(error);
  }
};
