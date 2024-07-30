// backend/routes/employeeRoutes.js

// Import necessary modules
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Employee = require('../models/employeeModel');
const { getAllEmployees, updateEmployee, deleteEmployee } = require('../controllers/employeeController');
const router = express.Router();

// Fetch all employees route
router.get('/all', getAllEmployees);

// Sign-up route
router.post('/signup', async (req, res) => {
  const { name, email, password, collectionCenter } = req.body;

  try {
    // Check if user already exists
    let employee = await Employee.findOne({ where: { email } });
    if (employee) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new employee
    employee = await Employee.create({
      name,
      email,
      password: hashedPassword,
      collectionCenter
    });

    res.status(201).json({ msg: 'User created successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Sign-in route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const employee = await Employee.findOne({ where: { email } });
    if (!employee) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Return JWT
    const payload = {
      employee: {
        id: employee.id
      }
    };

    jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Fetch employee details route
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Update employee details
router.put('/:id', updateEmployee);

// Delete employee route
router.delete('/:id', deleteEmployee);

module.exports = router;
