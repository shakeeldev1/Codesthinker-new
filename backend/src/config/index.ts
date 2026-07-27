import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  apiKey: process.env.API_KEY || 'super_secret_admin_key_123',
  databaseUrl: process.env.DATABASE_URL || 'file:./dev.db',
  
  // Email Notifications config
  email: {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    notifyEmail: process.env.NOTIFY_EMAIL || 'info@codesthinker.com',
  },
  
  // Uploads directory configuration
  uploadsDir: path.join(__dirname, '../../uploads'),
};
