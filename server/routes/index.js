const express = require('express');
const branchRouter = require('./branches');
const facilityRouter = require('./facilities');
const membershipRouter = require('./memberships');
const trainerRouter = require('./trainers');
const testimonialRouter = require('./testimonials');
const galleryRouter = require('./gallery');
const contactRouter = require('./contact');

const router = express.Router();

// Register sub-routers
router.use('/branches', branchRouter);
router.use('/facilities', facilityRouter);
router.use('/memberships', membershipRouter);
router.use('/trainers', trainerRouter);
router.use('/testimonials', testimonialRouter);
router.use('/gallery', galleryRouter);
router.use('/contact', contactRouter);

module.exports = router;
