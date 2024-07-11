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

module.exports = { getEmployees, addEmployee };
