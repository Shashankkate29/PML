const express = require('express');
const contactController = require('../controllers/contactController');
const { validateContactSubmission } = require('../validators/contactValidator');
const contactRateLimiter = require('../middleware/contactRateLimiter');

const router = express.Router();

router.get('/verify-smtp', contactController.verifySmtp);
router.post('/', contactRateLimiter, validateContactSubmission, contactController.submitMessage);
router.get('/', contactController.getMessages); // REST admin ready

module.exports = router;
