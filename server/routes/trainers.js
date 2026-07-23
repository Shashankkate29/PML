const express = require('express');
const trainerController = require('../controllers/trainerController');

const router = express.Router();

router.get('/', trainerController.getTrainers);
router.get('/:id', trainerController.getTrainer);

module.exports = router;
