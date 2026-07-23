const nodemailer = require('nodemailer');
const logger = require('../config/logger');
const emailTemplates = require('../utils/emailTemplates');

class EmailService {
  constructor() {
    this.host = process.env.SMTP_HOST || 'smtp.gmail.com';
    this.port = parseInt(process.env.SMTP_PORT || '587', 10);
    this.user = process.env.SMTP_EMAIL || process.env.SMTP_USER || '';
    this.pass = process.env.SMTP_PASSWORD || process.env.SMTP_PASS || '';
    
    // Multi-admin support: parse comma-separated admin recipient list
    const rawReceivers = process.env.CONTACT_RECEIVER_EMAIL || 'pmlfitnessandhelthclub7413@gmail.com';
    this.receivers = rawReceivers.split(',').map((email) => email.trim()).filter(Boolean);

    this.isConfigured = Boolean(this.host && this.user && this.pass);

    if (!this.isConfigured) {
      logger.warn('[EmailService] SMTP credentials missing in environment variables. Email dispatches will be disabled.');
    }

    const transportConfig = {
      host: this.host,
      port: this.port,
      secure: this.port === 465,
      auth: {
        user: this.user,
        pass: this.pass,
      },
      connectionTimeout: 10000, // 10s timeout protection
      greetingTimeout: 10000,
      socketTimeout: 10000,
    };

    if (this.host.includes('gmail.com')) {
      transportConfig.service = 'gmail';
      delete transportConfig.host;
      delete transportConfig.port;
    }

    this.transporter = nodemailer.createTransport(transportConfig);
  }

  async verifyConnection() {
    if (!this.isConfigured) {
      logger.warn('[EmailService] Connection verification skipped: SMTP credentials not configured.');
      return false;
    }

    try {
      await this.transporter.verify();
      logger.info('[EmailService] SMTP connection verified successfully and ready for dispatching.');
      return true;
    } catch (err) {
      logger.error(`[EmailService] SMTP connection verification failed: ${err.message}`);
      return false;
    }
  }

  async sendMailWithRetry(mailOptions, clientIp = 'N/A', maxRetries = 2, delayMs = 1000) {
    if (!this.isConfigured) {
      logger.warn(`[EmailService] [IP: ${clientIp}] Email dispatch skipped: SMTP configuration missing.`);
      return { success: false, reason: 'unconfigured' };
    }

    const startTime = Date.now();

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const info = await this.transporter.sendMail(mailOptions);
        const responseTime = Date.now() - startTime;
        
        logger.info(`[EmailService] [IP: ${clientIp}] Email status: SUCCESS | Target: ${mailOptions.to} | Retry Count: ${attempt - 1} | Response Time: ${responseTime}ms`);
        return { success: true, info, responseTime, retries: attempt - 1 };
      } catch (err) {
        const responseTime = Date.now() - startTime;
        logger.warn(`[EmailService] [IP: ${clientIp}] Email status: RETRY_FAIL | Target: ${mailOptions.to} | Attempt: ${attempt}/${maxRetries} | Error: ${err.message} | Response Time: ${responseTime}ms`);
        
        if (attempt === maxRetries) {
          logger.error(`[EmailService] [IP: ${clientIp}] Email status: FAILED | Target: ${mailOptions.to} | Total Retries: ${maxRetries - 1} | Error: ${err.message} | Response Time: ${responseTime}ms`);
          return { success: false, error: err.message, responseTime, retries: maxRetries - 1 };
        }

        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  async sendNewEnquiryNotification(enquiryData, clientIp) {
    const adminRecipients = this.receivers.join(', ');
    const mailOptions = emailTemplates.ownerEnquiryNotification(enquiryData, this.user, adminRecipients);
    return await this.sendMailWithRetry(mailOptions, clientIp);
  }

  async sendCustomerAutoReply(customerEmail, customerName, clientIp) {
    const mailOptions = emailTemplates.customerAutoReply(customerEmail, this.user);
    return await this.sendMailWithRetry(mailOptions, clientIp);
  }
}

module.exports = new EmailService();
