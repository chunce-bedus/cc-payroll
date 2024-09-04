// routes/employeeRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getEmployees, addEmployee, editEmployee, deleteEmployee } = require('../controllers/employeeController');
const Employee = require('../models/employeeModel');
const router = express.Router();

// Sign-up route
router.post('/signup', async (req, res) => {
  // ...existing sign-up code...
});

// Sign-in route
router.post('/signin', async (req, res) => {
  // ...existing sign-in code...
});

// Get all employees
router.get('/', getEmployees);

// Add a new employee
router.post('/', addEmployee);

// Edit an employee by ID
router.put('/:id', editEmployee);

// Delete an employee by ID
router.delete('/:id', deleteEmployee);

module.exports = router;
