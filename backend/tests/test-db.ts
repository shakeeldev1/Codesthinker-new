import prisma from '../src/db';
import logger from '../src/utils/logger';

async function runTest() {
  logger.info('Starting Database verification test...');

  try {
    // 1. Clean up any existing test records if they exist
    await prisma.contactSubmission.deleteMany({ where: { email: 'test@example.com' } });
    await prisma.serviceInquiry.deleteMany({ where: { email: 'test@example.com' } });
    await prisma.jobApplication.deleteMany({ where: { email: 'test@example.com' } });
    await prisma.internshipApplication.deleteMany({ where: { email: 'test@example.com' } });

    // 2. Test Contact Submission Insertion
    const contact = await prisma.contactSubmission.create({
      data: {
        firstName: 'Test',
        lastName: 'Developer',
        phone: '1234567890',
        email: 'test@example.com',
        subject: 'API Verification Test',
        message: 'This is a test message generated during API automated verification.',
      },
    });
    logger.info(`Successfully wrote ContactSubmission, ID: ${contact.id}`);

    // 3. Test Service Inquiry Insertion
    const service = await prisma.serviceInquiry.create({
      data: {
        fullName: 'Test User',
        email: 'test@example.com',
        phone: '0987654321',
        company: 'Automated Testing Corp',
        service: 'Web Development',
        budget: '$5,000 - $15,000',
        timeline: '1-2 weeks',
        message: 'Need a mock landing page for verification testing.',
      },
    });
    logger.info(`Successfully wrote ServiceInquiry, ID: ${service.id}`);

    // 4. Test Job Application Insertion
    const job = await prisma.jobApplication.create({
      data: {
        fullName: 'Candidate Job',
        email: 'test@example.com',
        phone: '555666777',
        position: 'Software Engineer',
        resumeName: 'resume-mock.pdf',
        resumeData: Buffer.from('%PDF-1.4 Mock PDF Binary Content'),
      },
    });
    logger.info(`Successfully wrote JobApplication, ID: ${job.id}`);

    // 5. Test Internship Application Insertion
    const intern = await prisma.internshipApplication.create({
      data: {
        fullName: 'Candidate Intern',
        email: 'test@example.com',
        phone: '777888999',
        position: 'Frontend Developer',
        resumeName: 'resume-mock.docx',
        resumeData: Buffer.from([0x50, 0x4B, 0x03, 0x04, 0, 0, 0, 0]),
      },
    });
    logger.info(`Successfully wrote InternshipApplication, ID: ${intern.id}`);

    // 6. Query and assert
    const contacts = await prisma.contactSubmission.findMany({ where: { email: 'test@example.com' } });
    const services = await prisma.serviceInquiry.findMany({ where: { email: 'test@example.com' } });
    const jobs = await prisma.jobApplication.findMany({ where: { email: 'test@example.com' } });
    const interns = await prisma.internshipApplication.findMany({ where: { email: 'test@example.com' } });

    if (contacts.length === 1 && services.length === 1 && jobs.length === 1 && interns.length === 1) {
      logger.info('Database Verification: SUCCESS. All inserts and reads matches expectations.');
    } else {
      throw new Error(`Verification count mismatch. Contacts: ${contacts.length}, Services: ${services.length}, Jobs: ${jobs.length}, Interns: ${interns.length}`);
    }

    // Clean up test data
    await prisma.contactSubmission.deleteMany({ where: { email: 'test@example.com' } });
    await prisma.serviceInquiry.deleteMany({ where: { email: 'test@example.com' } });
    await prisma.jobApplication.deleteMany({ where: { email: 'test@example.com' } });
    await prisma.internshipApplication.deleteMany({ where: { email: 'test@example.com' } });
    logger.info('Cleanup of test data complete.');

  } catch (error) {
    logger.error('Database Verification FAILED', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runTest();
