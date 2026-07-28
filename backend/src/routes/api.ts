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
  deleteInternshipApplication 
} from '../controllers/admin';
import { validateRequest } from '../middleware/validate';
import { contactSchema, serviceInquirySchema, careerSchema } from '../middleware/schemas';
import { upload } from '../middleware/upload';
import { protectAdmin } from '../middleware/auth';
import { noCache } from '../middleware/nocache';

const router = Router();

// Public Submission Routes
router.post('/contact', validateRequest(contactSchema), submitContact);
router.post('/services', validateRequest(serviceInquirySchema), submitServiceInquiry);

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

// Admin Delete Routes
router.delete('/admin/contacts/:id', protectAdmin, noCache, deleteContactSubmission);
router.delete('/admin/services/:id', protectAdmin, noCache, deleteServiceInquiry);
router.delete('/admin/jobs/:id', protectAdmin, noCache, deleteJobApplication);
router.delete('/admin/internships/:id', protectAdmin, noCache, deleteInternshipApplication);

export default router;
