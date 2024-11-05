//employeeController.js
const Employee = require('../models/employeeModel');
const bcrypt = require('bcrypt');

// Get all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Add a new employee
const addEmployee = async (req, res) => {
  const { name, email, password, collectionCenter } = req.body;

  try {
    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newEmployee = await Employee.create({ 
      name, 
      email, 
      password: hashedPassword, 
      collectionCenter 
    });
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Edit an employee's details
const editEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, collectionCenter } = req.body;

  try {
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }

    // Update fields
    if (name) employee.name = name;
    if (email) employee.email = email;
    if (collectionCenter) employee.collectionCenter = collectionCenter;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      employee.password = await bcrypt.hash(password, salt);
    }

    // Save the updated employee
    await employee.save();
    res.json(employee);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Delete an employee
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }

    // Delete the employee
    await employee.destroy();
    res.json({ msg: 'Employee removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = { getEmployees, addEmployee, editEmployee, deleteEmployee };
