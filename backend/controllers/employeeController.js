const Employee = require('../models/employeeModel');

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

module.exports = { getEmployees, addEmployee, getAllEmployees };
