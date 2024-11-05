// routes/salaryRoutes.js

const express = require('express');
const router = express.Router();
const { getSalaries, addSalary, calculateSalaryAmount, getSalariesByEmployee } = require('../controllers/salaryController');

// Route to get all salaries
router.get('/', getSalaries);

// Route to get all salaries by employeeId
router.get('/employee/:employeeId', getSalariesByEmployee);

// Route to add a new salary entry
router.post('/', addSalary);

// Route to calculate salary based on grading form details
router.post('/calculate', calculateSalaryAmount);

module.exports = router;
