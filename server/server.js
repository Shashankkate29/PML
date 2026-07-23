const app = require('./app');
const db = require('./config/db');
const logger = require('./config/logger');

const PORT = process.env.PORT || 5000;

let server;

async function startServer() {
  try {
    // 1. Test database connection
    console.log('[Server] Connecting to database...');
    const isDbConnected = await db.testConnection();
    if (!isDbConnected) {
      console.warn('[Server] WARNING: Could not connect to the database. Running in offline/fallback mode...');
    }

    // 2. Validate email configuration (async non-blocking check)
    const emailService = require('./services/emailService');
    emailService.verifyConnection().catch((err) => {
      logger.warn(`[Server] Non-blocking email verification encountered an issue: ${err.message}`);
    });

    // 3. Start listening
    server = app.listen(PORT, () => {
      logger.info(`[Server] Core API server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
      console.log(`[Server] Core API server running on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    });

  } catch (error) {
    logger.error('[Server] Critical failure during start sequence:', error);
    process.exit(1);
  }
}

// 3. Graceful shutdown handler
function gracefulShutdown(signal) {
  logger.info(`[Server] Received ${signal}. Starting graceful shutdown...`);
  console.log(`\n[Server] Received ${signal}. Starting graceful shutdown...`);

  if (server) {
    server.close(async () => {
      logger.info('[Server] HTTP server closed.');
      console.log('[Server] HTTP server closed.');
      
      try {
        const pool = db.getPool();
        if (pool) {
          await pool.end();
          logger.info('[Server] Database pool connections terminated.');
          console.log('[Server] Database pool connections terminated.');
        }
      } catch (dbError) {
        logger.error('[Server] Error closing database pool connections:', dbError);
      }
      
      logger.info('[Server] Graceful shutdown process complete.');
      console.log('[Server] Graceful shutdown process complete.');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }

  // Force close after 10s if graceful shutdown hangs
  setTimeout(() => {
    logger.warn('[Server] Forced shutdown limit reached. Exiting immediately.');
    console.warn('[Server] Forced shutdown limit reached. Exiting immediately.');
    process.exit(1);
  }, 10000);
}

// Register shutdown event signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Start server execution
startServer();
