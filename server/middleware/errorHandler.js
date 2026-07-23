const logger = require('../config/logger');

class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

function notFoundHandler(req, res, next) {
  const err = new ApiError(404, `API route not found: ${req.originalUrl}`);
  next(err);
}

function errorHandler(err, req, res, _next) {
  let { statusCode = 500, message } = err;

  // In production, mask non-operational (system/crash) errors
  if (process.env.NODE_ENV === 'production' && !err.isOperational) {
    statusCode = 500;
    message = 'Internal Server Error';
  }

  // Log to daily winston files
  logger.error({
    message: `${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
    stack: err.stack
  });

  const response = {
    success: false,
    error: message,
    data: null,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  };

  res.status(statusCode).json(response);
}

module.exports = {
  ApiError,
  notFoundHandler,
  errorHandler
};
