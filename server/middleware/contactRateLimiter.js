const rateLimit = require('express-rate-limit');
const { ApiError } = require('./errorHandler');

/**
 * Contact Rate Limiter
 * Enforces a strict limit of 5 enquiries per IP per hour to prevent spam attacks.
 */
const contactRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // Limit each IP to 5 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    return next(new ApiError(429, "We're currently unable to process your enquiry. Please try again later or contact us directly."));
  }
});

module.exports = contactRateLimiter;
