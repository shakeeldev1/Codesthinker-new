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
  downloadResume 
} from '../controllers/admin';
import { validateRequest } from '../middleware/validate';
import { contactSchema, serviceInquirySchema, careerSchema } from '../middleware/schemas';
import { upload } from '../middleware/upload';
import { protectAdmin } from '../middleware/auth';

const router = Router();

// Public Submission Routes
router.post('/contact', validateRequest(contactSchema), submitContact);
router.post('/services', validateRequest(serviceInquirySchema), submitServiceInquiry);

// Career Routes with File Upload (Multer executes first to populate req.body, then Zod validates req.body text fields)
router.post('/jobs', upload.single('resume'), validateRequest(careerSchema), submitJobApplication);
router.post('/internships', upload.single('resume'), validateRequest(careerSchema), submitInternshipApplication);

// Admin Routes (Protected)
router.get('/admin/overview', protectAdmin, getSubmissionsOverview);
router.get('/admin/contacts', protectAdmin, getContactSubmissions);
router.get('/admin/services', protectAdmin, getServiceInquiries);
router.get('/admin/jobs', protectAdmin, getJobApplications);
router.get('/admin/internships', protectAdmin, getInternshipApplications);
router.get('/admin/resumes/:type/:id', protectAdmin, downloadResume);

export default router;
