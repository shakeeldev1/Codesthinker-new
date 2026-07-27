import nodemailer from 'nodemailer';
import { config } from '../config';
import logger from '../utils/logger';

class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    // Only configure nodemailer if SMTP host is provided
    if (config.email.host && config.email.user && config.email.pass) {
      this.transporter = nodemailer.createTransport({
        host: config.email.host,
        port: config.email.port,
        secure: config.email.port === 465, // true for 465, false for other ports
        auth: {
          user: config.email.user,
          pass: config.email.pass,
        },
      });
      logger.info('SMTP Email Transporter configured successfully');
    } else {
      logger.warn('SMTP settings missing in config. Email notifications will be logged to console.');
    }
  }

  /**
   * Send notification email
   */
  async sendNotification(subject: string, htmlContent: string) {
    const mailOptions = {
      from: `"Code's Thinker Notification" <${config.email.user || 'no-reply@codesthinker.com'}>`,
      to: config.email.notifyEmail,
      subject: `[Website Form] ${subject}`,
      html: htmlContent,
    };

    if (this.transporter) {
      try {
        const info = await this.transporter.sendMail(mailOptions);
        logger.info(`Notification email sent: ${info.messageId}`);
      } catch (err) {
        logger.error('Failed to send notification email via SMTP', err);
      }
    } else {
      // Development fallback: log to console with clear separator
      console.log('\n--- DEVELOPMENT EMAIL SIMULATOR ---');
      console.log(`TO: ${mailOptions.to}`);
      console.log(`SUBJECT: ${mailOptions.subject}`);
      console.log('CONTENT:');
      console.log(htmlContent);
      console.log('------------------------------------\n');
    }
  }
}

export const emailService = new EmailService();
