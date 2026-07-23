const express = require('express');
const branchController = require('../controllers/branchController');

const router = express.Router();

router.get('/', branchController.getBranches);
router.get('/:id', branchController.getBranch);

module.exports = router;
