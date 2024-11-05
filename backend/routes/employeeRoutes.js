const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getEmployees, addEmployee, editEmployee, deleteEmployee } = require('../controllers/employeeController');
const Employee = require('../models/employeeModel');
const router = express.Router();

// Sign-up route
router.post('/signup', async (req, res) => {
  const { name, email, password, collectionCenter } = req.body;

  try {
    // Check if the email already exists
    const existingEmployee = await Employee.findOne({ where: { email } });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new employee
    const newEmployee = await Employee.create({
      name,
      email,
      password: hashedPassword,
      collectionCenter,
    });

    // Generate JWT token
    const token = jwt.sign({ id: newEmployee.EmployeeId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Sign-in route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find employee by email
    const employee = await Employee.findOne({ where: { email } });
    if (!employee) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: employee.EmployeeId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ message: 'Server error' });
  }
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
