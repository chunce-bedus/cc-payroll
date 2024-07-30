// backend/routes/employeeController.js
const Employee = require('../models/employeeModel');
const bcrypt = require('bcrypt');


const getEmployees = async (req, res) => {
  const employees = await Employee.findAll();
  res.json(employees);
};

const addEmployee = async (req, res) => {
  const { name, email, password, collectionCenter } = req.body;
  const newEmployee = await Employee.create({ name, email, password, collectionCenter });
  res.status(201).json(newEmployee);
};

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    const employeeNames = employees.map(employee => employee.name);
    res.json(employeeNames);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Update employee details
const updateEmployee = async (req, res) => {
  const { id } = req.params; // Assuming you're using the employee's ID for identification
  const { name, email, collectionCenter, password } = req.body;

  try {
    // Find the employee by ID
    let employee = await Employee.findByPk(id);
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

    res.json({ msg: 'Employee updated successfully', employee });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Delete Employee
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }

    // Delete the employee
    await employee.destroy();

    res.json({ msg: 'Employee deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = { getEmployees, addEmployee, getAllEmployees, updateEmployee,deleteEmployee };
