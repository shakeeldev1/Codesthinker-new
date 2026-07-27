import { z } from 'zod';

export const contactSchema = z.object({
  body: z.object({
    firstName: z.string({ required_error: 'First name is required' }).min(1, 'First name cannot be empty'),
    lastName: z.string({ required_error: 'Last name/Company is required' }).min(1, 'Last name cannot be empty'),
    phone: z.string().min(1, 'Phone number is required'),
    email: z.string({ required_error: 'Email is required' }).email('Invalid email address'),
    subject: z.string({ required_error: 'Subject is required' }).min(1, 'Subject cannot be empty'),
    message: z.string({ required_error: 'Message is required' }).min(5, 'Message must be at least 5 characters long'),
  }),
});

export const serviceInquirySchema = z.object({
  body: z.object({
    fullName: z.string({ required_error: 'Full name is required' }).min(1, 'Full name cannot be empty'),
    email: z.string({ required_error: 'Email is required' }).email('Invalid email address'),
    phone: z.string().min(1, 'Phone number is required'),
    company: z.string().min(1, 'Company is required'),
    service: z.string({ required_error: 'Service selection is required' }).min(1, 'Service cannot be empty'),
    budget: z.string().optional().nullable(),
    timeline: z.string().optional().nullable(),
    message: z.string({ required_error: 'Project details are required' }).min(5, 'Details must be at least 5 characters long'),
  }),
});

// For forms submitting file uploads (multipart/form-data),
// Multer parses text fields into req.body. We validate those text fields.
export const careerSchema = z.object({
  body: z.object({
    fullName: z.string({ required_error: 'Full name is required' }).min(1, 'Full name cannot be empty'),
    email: z.string({ required_error: 'Email is required' }).email('Invalid email address'),
    phone: z.string().min(1, 'Phone number is required'),
    position: z.string({ required_error: 'Position selection is required' }).min(1, 'Position cannot be empty'),
  }),
});
