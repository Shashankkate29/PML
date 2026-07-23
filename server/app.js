const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const path = require('path');

const requestLogger = require('./middleware/requestLogger');
const { apiRateLimiter } = require('./middleware/rateLimiter');
const apiRouter = require('./routes');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const { successResponse } = require('./utils/response');

const app = express();

// 1. Basic security headers
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "*"],
      imgSrc: ["'self'", "data:", "*"],
      styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
      fontSrc: ["'self'", "fonts.gstatic.com"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"]
    }
  }
}));

// 2. CORS configuration
const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({
  origin: corsOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. Performance middlewares
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Request Logging
app.use(requestLogger);

// 5. API Rate Limiting (applied to all api endpoints)
app.use('/api/', apiRateLimiter);

// 6. Health Check Endpoint (Versioned)
app.get('/api/v1/health', (req, res) => {
  return successResponse(res, {
    status: 'UP',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV
  }, 'System is running smoothly');
});

// 7. API Routes Mapping
app.use('/api/v1', apiRouter);

// Serve static assets in production or uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// If we are in production, we serve the frontend index.html from dist
if (process.env.NODE_ENV === 'production') {
  const distPath = path.resolve(process.cwd(), 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// 8. Centralized error fallbacks
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
