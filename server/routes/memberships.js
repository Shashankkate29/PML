const express = require('express');
const membershipController = require('../controllers/membershipController');

const router = express.Router();

router.get('/', membershipController.getMemberships);
router.get('/:id', membershipController.getMembership);

module.exports = router;
