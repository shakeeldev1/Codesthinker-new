import fs from 'fs';
import path from 'path';
import prisma from '../src/db';
import logger from '../src/utils/logger';

// Force port 5001 for endpoint verification testing
process.env.PORT = '5001';
process.env.NODE_ENV = 'test';
process.env.API_KEY = 'test_secret_api_key';

// Start the server by importing it
import '../src/index';

async function runEndpointsTest() {
  logger.info('Starting Endpoint Integration tests (Targeting http://localhost:5001)...');

  // Helper to wait for server initialization
  await new Promise((resolve) => setTimeout(resolve, 1500));

  let failed = false;

  try {
    // 1. Health Check
    logger.info('Testing health check endpoint...');
    const healthRes = await fetch('http://localhost:5001/health');
    const healthData = await healthRes.json();
    if (healthRes.status === 200 && healthData.status === 'ok') {
      logger.info('✅ Health check passed.');
    } else {
      logger.error(`❌ Health check failed. Status: ${healthRes.status}`);
      failed = true;
    }

    // 2. Submit Contact Inquiry
    logger.info('Testing contact submission...');
    const contactRes = await fetch('http://localhost:5001/api/v1/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Test-Name',
        lastName: 'Integration-Test-Corp',
        phone: '111222333',
        email: 'test@example.com',
        subject: 'Endpoint integration test',
        message: 'This is a mock inquiry for automated testing.',
      }),
    });
    const contactData = await contactRes.json();
    if (contactRes.status === 201 && contactData.success) {
      logger.info('✅ Contact submission passed.');
    } else {
      logger.error(`❌ Contact submission failed. Status: ${contactRes.status}, Error: ${contactData.message}`);
      failed = true;
    }

    // 3. Submit Services Inquiry
    logger.info('Testing service inquiry...');
    const serviceRes = await fetch('http://localhost:5001/api/v1/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Test Service-User',
        email: 'test@example.com',
        phone: '444555666',
        company: 'Verification Inc',
        service: 'Web Development',
        budget: '$5,000 - $15,000',
        timeline: '1-2 weeks',
        message: 'Looking to verify API request parsing.',
      }),
    });
    const serviceData = await serviceRes.json();
    if (serviceRes.status === 201 && serviceData.success) {
      logger.info('✅ Service inquiry passed.');
    } else {
      logger.error(`❌ Service inquiry failed. Status: ${serviceRes.status}, Error: ${serviceData.message}`);
      failed = true;
    }

    // 4. Submit Job Application (Multipart file upload)
    logger.info('Testing Job Application file upload...');
    const jobFormData = new FormData();
    jobFormData.append('fullName', 'Job Applicant');
    jobFormData.append('email', 'test@example.com');
    jobFormData.append('phone', '888999000');
    jobFormData.append('position', 'Software Engineer');
    
    // Create a mock buffer/blob file to upload
    const mockResumeBlob = new Blob(['%PDF-1.4 Mock PDF Content'], { type: 'application/pdf' });
    jobFormData.append('resume', mockResumeBlob, 'resume.pdf');

    const jobRes = await fetch('http://localhost:5001/api/v1/jobs', {
      method: 'POST',
      body: jobFormData,
    });
    const jobData = await jobRes.json();
    if (jobRes.status === 201 && jobData.success) {
      logger.info('✅ Job application file upload passed.');
    } else {
      logger.error(`❌ Job application failed. Status: ${jobRes.status}, Error: ${jobData.message}`);
      failed = true;
    }

    // 5. Submit Internship Application (Multipart file upload)
    logger.info('Testing Internship Application file upload...');
    const internFormData = new FormData();
    internFormData.append('fullName', 'Intern Applicant');
    internFormData.append('email', 'test@example.com');
    internFormData.append('phone', '123123123');
    internFormData.append('position', 'Frontend Developer');
    const mockDocxBlob = new Blob([new Uint8Array([0x50, 0x4B, 0x03, 0x04, 0, 0, 0, 0])], { type: 'application/octet-stream' });
    internFormData.append('resume', mockDocxBlob, 'resume.docx');

    const internRes = await fetch('http://localhost:5001/api/v1/internships', {
      method: 'POST',
      body: internFormData,
    });
    const internData = await internRes.json();
    if (internRes.status === 201 && internData.success) {
      logger.info('✅ Internship application file upload passed.');
    } else {
      logger.error(`❌ Internship application failed. Status: ${internRes.status}, Error: ${internData.message}`);
      failed = true;
    }

    // 6. Test Admin overview endpoint
    logger.info('Testing admin overview retrieval...');
    const adminRes = await fetch('http://localhost:5001/api/v1/admin/overview', {
      headers: {
        'x-api-key': 'test_secret_api_key',
      },
    });
    const adminData = await adminRes.json();
    if (adminRes.status === 200 && adminData.success) {
      logger.info(`✅ Admin overview retrieval passed. Counts: ${JSON.stringify(adminData.counts)}`);
    } else {
      logger.error(`❌ Admin overview failed. Status: ${adminRes.status}`);
      failed = true;
    }

    // Find uploads to clean them up in DB
    await prisma.jobApplication.deleteMany({ where: { email: 'test@example.com' } });
    await prisma.internshipApplication.deleteMany({ where: { email: 'test@example.com' } });

    logger.info('Database test records cleaned up.');

    // 7. Verify result
    if (failed) {
      logger.error('ENDPOINT TESTS COMPLETED WITH ERRORS.');
      process.exit(1);
    } else {
      logger.info('ALL ENDPOINT INTEGRATION TESTS PASSED SUCCESSFULLY.');
      process.exit(0);
    }

  } catch (error) {
    logger.error('Error occurred during endpoints test execution', error);
    process.exit(1);
  }
}

runEndpointsTest();
