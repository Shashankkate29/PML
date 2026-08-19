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
    await connection.query('DROP TABLE IF EXISTS branch_gallery');
    await connection.query('DROP TABLE IF EXISTS branch_facilities');
    await connection.query('DROP TABLE IF EXISTS contact_messages');
    await connection.query('DROP TABLE IF EXISTS gallery');
    await connection.query('DROP TABLE IF EXISTS branches');
    
    // Branches
    await connection.query(`
      CREATE TABLE IF NOT EXISTS branches (
        id INT AUTO_INCREMENT PRIMARY KEY,
        branch_number INT NOT NULL,
        name VARCHAR(100) NOT NULL,
        short_name VARCHAR(50) NOT NULL,
        slug VARCHAR(50) UNIQUE DEFAULT NULL,
        address VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(100) NOT NULL,
        operating_hours VARCHAR(100) NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        description TEXT DEFAULT NULL,
        map_url VARCHAR(500) DEFAULT NULL,
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

    // Branch Facilities
    await connection.query(`
      CREATE TABLE IF NOT EXISTS branch_facilities (
        branch_id INT NOT NULL,
        facility_id INT NOT NULL,
        PRIMARY KEY (branch_id, facility_id),
        FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE CASCADE,
        FOREIGN KEY (facility_id) REFERENCES facilities(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Branch Gallery
    await connection.query(`
      CREATE TABLE IF NOT EXISTS branch_gallery (
        branch_id INT NOT NULL,
        gallery_id INT NOT NULL,
        PRIMARY KEY (branch_id, gallery_id),
        FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE CASCADE,
        FOREIGN KEY (gallery_id) REFERENCES gallery(id) ON DELETE CASCADE
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
    await connection.query('TRUNCATE TABLE branch_gallery');
    await connection.query('TRUNCATE TABLE branch_facilities');
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
        1,
        'PML GYM – Barshi Branch',
        'Barshi',
        'barshi',
        'Paranda Road, Gadegaon Road, Barshi – 413401, Maharashtra',
        '+91 91307 65750',
        'pmlfitnessandhelthclub7413@gmail.com',
        'Monday – Sunday | Morning: 5:00 AM – 10:00 AM | Evening: 5:00 PM – 10:00 PM',
        'branch1_photo_2',
        'PML GYM Barshi — Perfect Management Longtime is our premier flagship fitness facility. Fully equipped for heavy performance strength training, professional cardiovascular conditioning, and signature thermal contrast therapy protocols (Steam & Ice Bath).',
        null
      ],
      [
        2,
        'PML GYM – Shivaji Nagar Branch',
        'Shivaji Nagar',
        'shivaji-nagar',
        'Shri Shivaji Mahavidyalaya College Road, opposite Bank of Maharashtra, Shivaji Nagar, Barshi, Maharashtra',
        '+91 86685 23713',
        'pmlfitnessandhelthclub7413@gmail.com',
        'Monday – Sunday | Morning: 5:00 AM – 10:00 AM | Evening: 5:00 PM – 10:00 PM',
        'branch2_photo_1',
        'PML GYM Shivaji Nagar Branch — Perfect Management Longtime delivers a dedicated environment for targeted athletic conditioning, cardio workouts, and personalized fitness coaching metrics.',
        null
      ]
    ];
    for (const branch of branches) {
      await connection.query('INSERT INTO branches (branch_number, name, short_name, slug, address, phone, email, operating_hours, image_url, description, map_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', branch);
    }

    // Seed Facilities
    console.log('[InitDB] Seeding facilities...');
    const facilities = [
      ['Weight Training', 'Dedicated strength-training area equipped with plate-loaded stations, selectorized machines, and free weights.', 'gym_photo_2', 'General'],
      ['Cardio Training', 'Equipped with professional treadmills, elliptical trainers, and stationary bikes for cardiovascular conditioning.', 'gym_photo_1', 'General'],
      ['Steam Bath', 'Dedicated steam-bath experience for muscle relaxation and post-workout recovery.', 'facilities_steam', 'Recovery'],
      ['Ice Bath', 'Cold-water recovery plunge designed to support post-workout muscle relief and circulation.', 'facilities_recovery', 'Recovery']
    ];
    for (const facility of facilities) {
      await connection.query('INSERT INTO facilities (name, description, image_url, category) VALUES (?, ?, ?, ?)', facility);
    }

    // Seed Branch Facilities
    console.log('[InitDB] Seeding branch_facilities...');
    const [dbBranches] = await connection.query('SELECT id, slug FROM branches');
    const [dbFacilities] = await connection.query('SELECT id, name FROM facilities');

    const barshiBranch = dbBranches.find(b => b.slug === 'barshi');
    const shivajiNagarBranch = dbBranches.find(b => b.slug === 'shivaji-nagar');

    if (barshiBranch && shivajiNagarBranch) {
      // Barshi: Weight Training, Cardio Training, Steam Bath, Ice Bath
      const barshiFacilities = ['Weight Training', 'Cardio Training', 'Steam Bath', 'Ice Bath'];
      // Shivaji Nagar: Weight Training, Cardio Training
      const shivajiNagarFacilities = ['Weight Training', 'Cardio Training'];

      for (const fName of barshiFacilities) {
        const fac = dbFacilities.find(f => f.name === fName);
        if (fac) {
          await connection.query('INSERT INTO branch_facilities (branch_id, facility_id) VALUES (?, ?)', [barshiBranch.id, fac.id]);
        }
      }

      for (const fName of shivajiNagarFacilities) {
        const fac = dbFacilities.find(f => f.name === fName);
        if (fac) {
          await connection.query('INSERT INTO branch_facilities (branch_id, facility_id) VALUES (?, ?)', [shivajiNagarBranch.id, fac.id]);
        }
      }
    }

    // Seed Gallery
    console.log('[InitDB] Seeding gallery...');
    const galleryItems = [
      ['Therapeutic Steam Bath', 'Separate luxury steam bath suite for recovery and relaxation.', 'facilities_steam', 'Recovery'],
      ['Contrast Therapy Ice Bath', 'Separate professional ice bath plunge for muscle recovery.', 'facilities_recovery', 'Recovery'],
      ['Cardio Conditioning Treadmills', 'Professional treadmills for cardiovascular endurance training.', 'gym_photo_1', 'Equipment'],
      ['Selectorized Strength Row', 'Row of commercial resistance stack strength machines.', 'gym_photo_2', 'Equipment'],
      ['Upper Body Chest Press Machine', 'Pin-selected chest press machine for upper body development.', 'gym_photo_3', 'Equipment'],
      ['Leg Conditioning Station', 'Leg extension conditioning machine for quad isolate training.', 'gym_photo_4', 'Equipment'],
      ['Dumbbells & Cable Crossover Area', 'Dumbbells station and multi-angle cable crossover pulley setup.', 'gym_photo_5', 'Equipment'],
      ['Heavy Squat Platform', 'Power cage platform for strength compound squats.', 'gym_photo_6', 'Training'],
      ['Linear Plate-Loaded Leg Press', 'Plate-loaded leg press sled for high-capacity lower body training.', 'gym_photo_7', 'Equipment'],
      ['Elite Free Weights Dumbbells Rack', 'Multiple tiers of professional-grade training dumbbells.', 'gym_photo_8', 'Equipment'],
      ['Strength Benches', 'Flat and incline bench press setups for strength training.', 'gym_photo_9', 'Equipment'],
      ['Flagship Squat Cage Setup', 'Heavy-duty power squat cage setup.', 'gym_photo_10', 'Equipment']
    ];
    for (const item of galleryItems) {
      await connection.query('INSERT INTO gallery (title, description, image_url, category) VALUES (?, ?, ?, ?)', item);
    }

    // Seed Branch Gallery
    console.log('[InitDB] Seeding branch_gallery...');
    const [dbGallery] = await connection.query('SELECT id, image_url FROM gallery');
    if (barshiBranch && shivajiNagarBranch) {
      // Both branch galleries are populated dynamically via folder scanning
      const barshiGallery = [];
      const shivajiNagarGallery = [];

      for (const imgKey of barshiGallery) {
        const galItem = dbGallery.find(g => g.image_url === imgKey);
        if (galItem) {
          await connection.query('INSERT INTO branch_gallery (branch_id, gallery_id) VALUES (?, ?)', [barshiBranch.id, galItem.id]);
        }
      }

      for (const imgKey of shivajiNagarGallery) {
        const galItem = dbGallery.find(g => g.image_url === imgKey);
        if (galItem) {
          await connection.query('INSERT INTO branch_gallery (branch_id, gallery_id) VALUES (?, ?)', [shivajiNagarBranch.id, galItem.id]);
        }
      }
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
          'Locker Room & Shower Access',
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
          'Locker Room & Steam Bath Access',
          'Personalized Workout Plan'
        ]), 
        false
      ],
      [
        '12 Months', 
        8999.00, 
        '12 Months', 
        JSON.stringify([
          'Unlimited 1-year access',
          'Full facility access (All Zones)',
          'Complimentary Locker & Steam Bath'
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
      ['Rohan Sharma', 5, 'PML GYM has great equipment and the recovery facilities are clean and well-maintained.', '6 Months', 'trainer_1'],
      ['Ananya Patel', 5, 'Highly professional environment. The conditioning setups are top tier and contrast therapy really helps after a hard session.', '12 Months', 'trainer_2']
    ];
    for (const testimonial of testimonials) {
      await connection.query('INSERT INTO testimonials (member_name, rating, review, membership_type, image_url) VALUES (?, ?, ?, ?, ?)', testimonial);
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
