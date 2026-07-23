const contactService = require('../services/contactService');
const emailService = require('../services/emailService');
const { successResponse } = require('../utils/response');

class ContactController {
  async submitMessage(req, res, next) {
    try {
      const contactData = { ...req.body, ip: req.ip };
      const result = await contactService.submitContactMessage(contactData);
      
      return successResponse(
        res, 
        result.dbRecord, 
        'Thank you! Your enquiry has been received successfully. Our team will contact you shortly.', 
        201
      );
    } catch (error) {
      next(error);
    }
  }

  async verifySmtp(req, res) {
    try {
      const isConnected = await emailService.verifyConnection();
      return res.status(200).json({
        status: isConnected ? 'connected' : 'disconnected'
      });
    } catch {
      return res.status(200).json({
        status: 'disconnected'
      });
    }
  }

  async getMessages(req, res, next) {
    try {
      const messages = await contactService.getAllMessages();
      return successResponse(res, messages, 'Contact messages retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ContactController();
