const mysql = require('mysql2/promise');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from correct env file based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const poolConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'pml_gym',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000
};

let pool;

function getPool() {
  if (!pool) {
    console.log(`[Database] Creating connection pool for ${poolConfig.host}:${poolConfig.port}/${poolConfig.database}`);
    pool = mysql.createPool(poolConfig);

    pool.on('connection', () => {
      console.log('[Database] New connection established in pool');
    });

    pool.on('error', (err) => {
      console.error('[Database] Connection pool error:', err.message);
      if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNREFUSED') {
        console.log('[Database] Connection lost. Resetting pool for re-creation...');
        pool = null;
      }
    });
  }
  return pool;
}

// Test connection on startup
async function testConnection() {
  try {
    const activePool = getPool();
    const conn = await activePool.getConnection();
    console.log('[Database] Successfully connected to MySQL database');
    conn.release();
    return true;
  } catch (error) {
    console.error('[Database] Failed to connect to MySQL database:', error.message);
    pool = null; // reset pool
    return false;
  }
}

// Parameterized query execution wrapper
async function query(sql, params) {
  const activePool = getPool();
  try {
    const [results] = await activePool.execute(sql, params);
    return results;
  } catch (error) {
    console.error(`[Database] Query failed: ${error.message}`);
    if (error.code === 'PROTOCOL_CONNECTION_LOST' || error.code === 'ECONNREFUSED') {
      console.log('[Database] Connection lost during query execution. Resetting pool...');
      pool = null;
    }
    throw error;
  }
}

// Transaction execution wrapper
async function transaction(callback) {
  const activePool = getPool();
  const connection = await activePool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    console.log('[Database] Transaction error occurred. Rolling back...');
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = {
  getPool,
  testConnection,
  query,
  transaction
};
