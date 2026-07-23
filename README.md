# PML GYM - Premium Fitness & Recovery Labs

A production-ready, high-performance, and secure full-stack web application designed for **PML GYM**. Built with React, TypeScript, and Vite on the frontend, and Express, Node.js, and MySQL on the backend, using the Service-Repository pattern.

---

## Folder Structure

```text
pml-gym/
├── .env.development      # Development environment variables
├── .env.production       # Production environment variables
├── .env.example          # Example environment file template
├── database.sql          # MySQL database schema setup script
├── package.json          # Root package definitions
├── index.html            # Main frontend HTML template
├── public/               # Static assets & PWA files
│   ├── manifest.json     # PWA configuration manifest
│   ├── robots.txt        # Web crawler guidelines
│   ├── sitemap.xml       # XML Sitemap for search indexing
│   └── sw.js             # Offline Service Worker script
├── server/               # Express Backend Server
│   ├── server.js         # Entry point (bootstrapping and shutdown listeners)
│   ├── app.js            # Express application wrapper & middlewares
│   ├── config/           # Central pool config, Winston, & db initializers
│   ├── routes/           # Routing layers (no business logic)
│   ├── controllers/      # Controller endpoints mapping req/res
│   ├── services/         # Core business logic handlers
│   ├── repositories/     # Data queries and raw database commands
│   ├── validators/       # Input validators using express-validator
│   ├── middleware/       # Error handling, logging, rate limiting
│   ├── utils/            # Shared response helper files
│   └── logs/             # Rotated log files (error & access logs)
├── src/                  # React Frontend Application
│   ├── main.tsx          # Bootstrap entry point with routing provider
│   ├── App.tsx           # Code-split lazy routing configurations
│   ├── index.css         # Central CSS design system & variables
│   ├── config/           # Global site identity variables (siteConfig.ts)
│   ├── common/           # Custom hooks (useFetch.ts) and helper utilities
│   ├── layouts/          # Sticky Navbar, Footer, and AppLayout transitions
│   ├── sections/         # Reusable page sections under 250 lines
│   ├── cards/            # Reusable data card rendering components
│   ├── ui/               # Generic UI loaders, glass cards, buttons, skeletons
│   └── assets/           # Central image config & source brand images
│       ├── config/       # images.ts central import config
│       └── images/       # Brand logo and premium gym photos
└── tests/                # Testing Framework Configurations
    ├── unit/             # Isolated logic tests
    ├── component/        # Visual React component tests
    ├── api/              # Endpoint REST validation tests
    └── e2e/              # End-to-end user path tests
```

---

## Installation & Setup

### Prerequisites
- Node.js (v16.x or later)
- MySQL Server (running on port 3306)

### 1. Database Setup
Ensure your MySQL database is active, then run the initialization script to automatically create the schema and seed default data:
```bash
# Verify environment config in .env.development matches your local MySQL
npm run init-db
```
*Note: This runs `server/config/init_db.js`, which sets up the database `pml_gym` and seeds realistic branches, facilities, memberships, trainers, testimonials, and gallery data.*

### 2. Frontend & Backend Setup
Install project dependencies and start the development server:
```bash
# Install dependencies
npm install

# Start backend server & frontend dev environment concurrently
npm run dev
```

The frontend will run on [http://localhost:5173](http://localhost:5173) and the backend API server will run on [http://localhost:5000](http://localhost:5000).

---

## API Documentation

All routes are versioned and prefixed with `/api/v1`.

### 1. Health Check
- **GET** `/api/v1/health`
  - Returns server health status.

### 2. Branches
- **GET** `/api/v1/branches`
  - Retrieves all active branches.
- **GET** `/api/v1/branches/:id`
  - Retrieves a specific branch detail.

### 3. Facilities
- **GET** `/api/v1/facilities`
  - Retrieves all facilities. Supports filtering via query param: `?category=Recovery Zone`.

### 4. Memberships
- **GET** `/api/v1/memberships`
  - Retrieves pricing plans.

### 5. Trainers
- **GET** `/api/v1/trainers`
  - Retrieves coach profiles.

### 6. Testimonials
- **GET** `/api/v1/testimonials`
  - Retrieves client reviews. Supports `?featured=true` filter.

### 7. Contact Messages
- **POST** `/api/v1/contact`
  - Submits user contact inquiries. Enforces input validation (name, email, subject, message).

---

## Security Features
1. **Helmet**: Configures HTTP headers for clickjacking, XSS protection, and restrictive Content Security Policies (CSP).
2. **CORS**: Handles Cross-Origin Resource Sharing based on env settings.
3. **Rate Limiting**: Throttles brute force requests (100 requests per 15 mins per IP).
4. **Parameterization**: Employs parameterized MySQL queries (`db.execute`) protecting against SQL Injection.
5. **Masked Errors**: Stack traces are disabled under production to prevent exposing server details.

---

## Future Expansion
The architecture is structured to support the following expansions without requiring rewrites:
- **Member & Trainer Login**: Add routes under `/api/v1/auth/` and register validators, connecting them to a new `users` table.
- **Supplement Store**: Set up products database tables and map endpoints to a `StoreController`.
- **Payment Gateway**: Integrate Stripe or Razorpay SDKs inside the `MembershipService`.
- **Push Notifications & WhatsApp**: Register event listeners inside services to call notification drivers.
