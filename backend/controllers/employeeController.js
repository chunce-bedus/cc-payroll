// controllers/employeeController.js
const bcrypt = require('bcrypt');
const Employee = require('../models/employeeModel');

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
    const newEmployee = await Employee.create({ name, email, password, collectionCenter });
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

    // Update employee details
    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.collectionCenter = collectionCenter || employee.collectionCenter;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      employee.password = await bcrypt.hash(password, salt);
    }

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

    await employee.destroy();
    res.json({ msg: 'Employee removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = { getEmployees, addEmployee, editEmployee, deleteEmployee };
