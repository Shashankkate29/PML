const contactRepository = require('../repositories/contactRepository');
const emailService = require('./emailService');
const logger = require('../config/logger');

class ContactService {
  async submitContactMessage(contactData) {
    logger.info(`[ContactService] Processing new contact message from ${contactData.email}`);
    
    // 1. Store enquiry in database first
    const dbRecord = await contactRepository.create(contactData);

    // 2. Queue background email dispatches asynchronously without delaying HTTP response
    setImmediate(async () => {
      try {
        const clientIp = contactData.ip || 'N/A';
        await emailService.sendNewEnquiryNotification(contactData, clientIp);
        await emailService.sendCustomerAutoReply(contactData.email, contactData.name, clientIp);
      } catch (err) {
        logger.error(`[ContactService] Background email dispatch failed for enquiry #${dbRecord.id}: ${err.message}`);
      }
    });

    return { dbRecord, queued: true };
  }

  async getAllMessages() {
    return await contactRepository.findAll();
  }
}

module.exports = new ContactService();
