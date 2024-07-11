const Salary = require('../models/salaryModel');

const getSalaries = async (req, res) => {
  const salaries = await Salary.findAll();
  res.json(salaries);
};

const addSalary = async (req, res) => {
  const { employeeId, date, amount } = req.body;
  const newSalary = await Salary.create({ employeeId, date, amount });
  res.status(201).json(newSalary);
};

module.exports = { getSalaries, addSalary };
