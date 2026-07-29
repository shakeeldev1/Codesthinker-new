import { Router } from 'express';
import { submitContact } from '../controllers/contact';
import { submitServiceInquiry } from '../controllers/service';
import { submitJobApplication, submitInternshipApplication } from '../controllers/career';
import { 
  getSubmissionsOverview, 
  getContactSubmissions, 
  getServiceInquiries, 
  getJobApplications, 
  getInternshipApplications, 
  downloadResume,
  loginAdmin,
  logoutAdmin,
  deleteContactSubmission,
  deleteServiceInquiry,
  deleteJobApplication,
  deleteInternshipApplication,
  updateJobApplication,
  updateInternshipApplication,
} from '../controllers/admin';
import {
  getAdminUsers,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
  resetAdminUserPassword,
} from '../controllers/users';
import {
  getPublicJobPostings,
  getPublicJobPosting,
  getAdminJobPostings,
  getAdminJobPosting,
  createJobPosting,
  updateJobPosting,
  deleteJobPosting,
} from '../controllers/jobPostings';
import { validateRequest } from '../middleware/validate';
import { contactSchema, serviceInquirySchema, careerSchema } from '../middleware/schemas';
import { upload } from '../middleware/upload';
import { protectAdmin, requirePermission } from '../middleware/auth';
import { noCache } from '../middleware/nocache';

const router = Router();

// Public Submission Routes
router.post('/contact', validateRequest(contactSchema), submitContact);
router.post('/services', validateRequest(serviceInquirySchema), submitServiceInquiry);

// Public Career Routes
router.get('/careers', getPublicJobPostings);
router.get('/careers/:id', getPublicJobPosting);

// Career Routes with File Upload (Multer executes first to populate req.body, then Zod validates req.body text fields)
router.post('/jobs', upload.single('resume'), validateRequest(careerSchema), submitJobApplication);
router.post('/internships', upload.single('resume'), validateRequest(careerSchema), submitInternshipApplication);

// Admin Routes (Protected)
router.post('/admin/login', loginAdmin); // Public POST for login
router.post('/admin/logout', logoutAdmin); // Public POST for logout
router.get('/admin/overview', protectAdmin, noCache, getSubmissionsOverview);
router.get('/admin/contacts', protectAdmin, noCache, getContactSubmissions);
router.get('/admin/services', protectAdmin, noCache, getServiceInquiries);
router.get('/admin/jobs', protectAdmin, noCache, getJobApplications);
router.get('/admin/internships', protectAdmin, noCache, getInternshipApplications);
router.get('/admin/resumes/:type/:id', protectAdmin, noCache, downloadResume);

// Admin Job Postings Routes
router.get('/admin/job-postings', protectAdmin, noCache, getAdminJobPostings);
router.get('/admin/job-postings/:id', protectAdmin, noCache, getAdminJobPosting);
router.post('/admin/job-postings', protectAdmin, requirePermission('manage_users'), noCache, createJobPosting);
router.put('/admin/job-postings/:id', protectAdmin, requirePermission('manage_users'), noCache, updateJobPosting);
router.delete('/admin/job-postings/:id', protectAdmin, requirePermission('manage_users'), noCache, deleteJobPosting);

// Admin Update Routes
router.put('/admin/jobs/:id', protectAdmin, requirePermission('delete_records'), noCache, updateJobApplication);
router.put('/admin/internships/:id', protectAdmin, requirePermission('delete_records'), noCache, updateInternshipApplication);

// Admin Delete Routes
router.delete('/admin/contacts/:id', protectAdmin, requirePermission('delete_records'), noCache, deleteContactSubmission);
router.delete('/admin/services/:id', protectAdmin, requirePermission('delete_records'), noCache, deleteServiceInquiry);
router.delete('/admin/jobs/:id', protectAdmin, requirePermission('delete_records'), noCache, deleteJobApplication);
router.delete('/admin/internships/:id', protectAdmin, requirePermission('delete_records'), noCache, deleteInternshipApplication);

// Admin User Management Routes (requires manage_users permission)
router.get('/admin/users', protectAdmin, requirePermission('manage_users'), noCache, getAdminUsers);
router.post('/admin/users', protectAdmin, requirePermission('manage_users'), noCache, createAdminUser);
router.put('/admin/users/:id', protectAdmin, requirePermission('manage_users'), noCache, updateAdminUser);
router.delete('/admin/users/:id', protectAdmin, requirePermission('manage_users'), noCache, deleteAdminUser);
router.post('/admin/users/:id/reset-password', protectAdmin, requirePermission('manage_users'), noCache, resetAdminUserPassword);

export default router;

