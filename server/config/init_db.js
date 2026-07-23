const mysql = require('mysql2/promise');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || ''
};

const dbName = process.env.DB_NAME || 'pml_gym';

async function initDatabase() {
  let connection;
  try {
    console.log(`[InitDB] Connecting to MySQL at ${dbConfig.host}:${dbConfig.port} as ${dbConfig.user}...`);
    connection = await mysql.createConnection(dbConfig);

    // 1. Create database
    console.log(`[InitDB] Creating database '${dbName}' if not exists...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    await connection.query(`USE \`${dbName}\``);

    // 2. Create Tables
    console.log('[InitDB] Creating tables...');
    await connection.query('DROP TABLE IF EXISTS contact_messages');
    await connection.query('DROP TABLE IF EXISTS gallery');
    
    // Branches
    await connection.query(`
      CREATE TABLE IF NOT EXISTS branches (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        address VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(100) NOT NULL,
        operating_hours VARCHAR(100) NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_branch_name (name)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Facilities
    await connection.query(`
      CREATE TABLE IF NOT EXISTS facilities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        category VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_facility_category (category)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Memberships
    await connection.query(`
      CREATE TABLE IF NOT EXISTS memberships (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        billing_period VARCHAR(50) NOT NULL,
        features JSON NOT NULL,
        popular BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_membership_price (price)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Trainers
    await connection.query(`
      CREATE TABLE IF NOT EXISTS trainers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        role VARCHAR(100) NOT NULL,
        bio TEXT NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        specialties JSON NOT NULL,
        social_links JSON NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_trainer_name (name)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Testimonials
    await connection.query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        member_name VARCHAR(100) NOT NULL,
        rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
        review TEXT NOT NULL,
        membership_type VARCHAR(50) NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_testimonial_rating (rating)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Gallery
    await connection.query(`
      CREATE TABLE IF NOT EXISTS gallery (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description TEXT DEFAULT NULL,
        image_url VARCHAR(255) NOT NULL,
        category VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_gallery_category (category)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Contact Messages
    await connection.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20) DEFAULT NULL,
        subject VARCHAR(150) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_contact_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    console.log('[InitDB] Tables checked/created successfully.');

    // 3. Seed Data
    console.log('[InitDB] Cleaning existing demo data for clean seeding...');
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');
    await connection.query('TRUNCATE TABLE branches');
    await connection.query('TRUNCATE TABLE facilities');
    await connection.query('TRUNCATE TABLE memberships');
    await connection.query('TRUNCATE TABLE trainers');
    await connection.query('TRUNCATE TABLE testimonials');
    await connection.query('TRUNCATE TABLE gallery');
    await connection.query('SET FOREIGN_KEY_CHECKS = 1');

    // Seed Branches
    console.log('[InitDB] Seeding branches...');
    const branches = [
      [
        'PML GYM – Barshi Branch',
        'Paranda Road, Gadegaon Road, Barshi – 413401, Solapur District, Maharashtra, India',
        '+91 91307 65750',
        'pmlfitnessandhelthclub7413@gmail.com',
        'Monday – Sunday | Morning: 5:00 AM – 10:00 AM | Evening: 5:00 PM – 10:00 PM',
        'facilities_gym'
      ],
      [
        'PML GYM – Shivaji Nagar Branch',
        'College Road, Opposite Bank of Maharashtra, Near Shri Shivaji Mahavidyalaya, Shivaji Nagar, Barshi, Solapur District, Maharashtra, India',
        '+91 86685 23713',
        'pmlfitnessandhelthclub7413@gmail.com',
        'Monday – Sunday | Morning: 5:00 AM – 10:00 AM | Evening: 5:00 PM – 10:00 PM',
        'facilities_cardio'
      ]
    ];
    for (const branch of branches) {
      await connection.query('INSERT INTO branches (name, address, phone, email, operating_hours, image_url) VALUES (?, ?, ?, ?, ?, ?)', branch);
    }

    // Seed Facilities
    console.log('[InitDB] Seeding facilities...');
    const facilities = [
      ['Weight Training', 'Dedicated high-performance strength zone with heavy dumbbells, specialized plates, lifting platforms, and pin-selected selectorized machines.', 'facilities_gym', 'General'],
      ['CrossFit', 'Functional conditioning space featuring power cages, gymnastics rings, air bikes, rowing machines, and sled tracks.', 'facilities_cardio', 'General'],
      ['Yoga', 'Tranquil ambient-lit studio space hosting Vinyasa, Hatha, and alignment-focused guided sessions.', 'gallery_1', 'General'],
      ['Zumba', 'Energetic cardio-dance classes in our premium sound-equipped aerobics studio.', 'facilities_zumba', 'General'],
      ['Personal Training', '1-on-1 private coaching programs backed by biometric assessments and tailored progressive loading.', 'trainer_1', 'General'],
      ['Ladies Trainer', 'Dedicated female coaching staff providing comfortable, focused strength and lifestyle guidance.', 'trainer_2', 'General'],
      ['Nutrition Guidance', 'Professional dietary planning, macro breakdown targets, and calorie tracking structures.', 'facilities_nutrition', 'General'],
      ['Fitness Kitchen', 'Nutritious meal prep prep-packs, premium protein shakes, and performance recovery food options.', 'facilities_kitchen', 'General'],
      ['Steam Bath', 'Relax and recover in our premium steam bath designed to improve circulation, reduce muscle tension, detoxify the body, and enhance post-workout recovery.', 'facilities_steam', 'Recovery'],
      ['Ice Bath', 'Cold plunge contrast tubs maintained at optimal sub-10°C temperatures to accelerate muscle recovery and reduce inflammation.', 'facilities_recovery', 'Recovery']
    ];
    for (const facility of facilities) {
      await connection.query('INSERT INTO facilities (name, description, image_url, category) VALUES (?, ?, ?, ?)', facility);
    }

    // Seed Memberships
    console.log('[InitDB] Seeding memberships...');
    const memberships = [
      [
        '1 Month', 
        1800.00, 
        'Month', 
        JSON.stringify([
          'Full Gym Floor Access',
          'Cardio & Strength Zones',
          'Locker room & Shower access',
          'General Trainer Assistance'
        ]), 
        false
      ],
      [
        '6 Months', 
        6000.00, 
        '6 Months', 
        JSON.stringify([
          'Access to all training facilities',
          'Locker room & steam bath access',
          'Personalized Workout Plan',
          'Biometric assessment check'
        ]), 
        true
      ],
      [
        '12 Months', 
        8999.00, 
        '12 Months', 
        JSON.stringify([
          'Unlimited 1-year access',
          'Full facility access (All Zones)',
          'Complimentary locker & steam bath',
          'Advanced biometric assessment',
          'Free customized diet counseling'
        ]), 
        false
      ]
    ];
    for (const membership of memberships) {
      await connection.query('INSERT INTO memberships (name, price, billing_period, features, popular) VALUES (?, ?, ?, ?, ?)', membership);
    }

    // Seed Trainers
    console.log('[InitDB] Seeding trainers...');
    const trainers = [
      [
        'Marcus Thorne', 
        'Director of Athletic Performance', 
        'Former competitive decathlete with 12+ years of experience coaching elite athletes and powerlifters. Specializes in force development and biomechanical alignment.',
        'trainer_1', 
        JSON.stringify(['Olympic Weightlifting', 'Speed & Agility', 'Injury Rehabilitation']),
        JSON.stringify({ instagram: '@marcusthorne_pml', twitter: '@marcus_pml' })
      ],
      [
        'Sarah Jenkins', 
        'Lead Mobility & Reformer Specialist', 
        'Dedicated to building resilient bodies through functional movement, advanced Pilates reformer, and active flexibility training. Focuses on longevity and posture alignment.',
        'trainer_2', 
        JSON.stringify(['Pilates Reformer', 'Mobility & Flexibility', 'Core Conditioning']),
        JSON.stringify({ instagram: '@sarahj_mobility', twitter: '@sarah_pml' })
      ]
    ];
    for (const trainer of trainers) {
      await connection.query('INSERT INTO trainers (name, role, bio, image_url, specialties, social_links) VALUES (?, ?, ?, ?, ?, ?)', trainer);
    }

    // Seed Testimonials
    console.log('[InitDB] Seeding testimonials...');
    const testimonials = [
      ['Rohan Sharma', 5, 'PML Gym has completely changed my perspective on fitness. The state-of-the-art equipment and the Recovery Lab are world-class.', '6 Months', 'trainer_1'],
      ['Ananya Patel', 5, 'The coaches here are highly professional. The VIP package is worth every penny—I feel like a professional athlete utilizing the recovery zone.', '12 Months', 'trainer_2']
    ];
    for (const testimonial of testimonials) {
      await connection.query('INSERT INTO testimonials (member_name, rating, review, membership_type, image_url) VALUES (?, ?, ?, ?, ?)', testimonial);
    }

    // Seed Gallery
    console.log('[InitDB] Seeding gallery...');
    const galleryItems = [
      ['Strength Training Floor', 'High-performance strength training zone.', 'facilities_gym', 'Equipment'],
      ['Cardio Zone Overhead', 'Biometric cardio area.', 'facilities_cardio', 'Equipment'],
      ['Ice Bath', 'Premium cold plunge therapy designed to reduce inflammation, accelerate muscle recovery, improve circulation, and enhance athletic performance.', 'facilities_recovery', 'Recovery'],
      ['Steam Bath', 'Relax and recover in our premium steam bath designed to improve circulation, reduce muscle tension, detoxify the body, and enhance post-workout recovery.', 'facilities_steam', 'Recovery'],
      ['Dynamic Yoga Session', 'Guided mobility and yoga studio.', 'gallery_1', 'Classes'],
      ['Premium Dumbbell Array', 'Heavy-duty dumbbell racks.', 'gallery_2', 'Equipment']
    ];
    for (const item of galleryItems) {
      await connection.query('INSERT INTO gallery (title, description, image_url, category) VALUES (?, ?, ?, ?)', item);
    }

    console.log('[InitDB] Database initialization and seeding completed successfully!');
    return true;
  } catch (error) {
    console.error('[InitDB] Error initializing database:', error.message);
    return false;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Execute if run directly
if (require.main === module) {
  initDatabase().then((success) => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = initDatabase;
