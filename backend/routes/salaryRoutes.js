// backend/routes/salaryRoutes.js
const express = require('express');
const { getSalaries, addSalary, calculateSalary } = require('../controllers/salaryController');
const router = express.Router();

router.get('/', getSalaries);
router.post('/', addSalary);
router.post('/calculate', calculateSalary);

module.exports = router;
