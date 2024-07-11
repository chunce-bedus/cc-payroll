const express = require('express');
const { getSalaries, addSalary } = require('../controllers/salaryController');
const router = express.Router();

router.get('/', getSalaries);
router.post('/', addSalary);

module.exports = router;
