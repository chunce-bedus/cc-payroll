// backend/controllers/salaryController.js
const Salary = require('../models/salaryModel');
const { calculateSalaryAmount } = require('../utils/salaryCalculator');

// Calculate salary
const calculateSalary = (req, res) => {
  const { grade, weight, headcount } = req.body;

  try {
    const salary = calculateSalaryAmount(grade, weight, headcount);
    res.json({ salary });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get all salaries
const getSalaries = async (req, res) => {
  try {
    const salaries = await Salary.findAll();
    res.json(salaries);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Add a new salary
const addSalary = async (req, res) => {
  const { employeeId, amount, date } = req.body;

  try {
    const newSalary = await Salary.create({
      employeeId,
      amount,
      date
    });

    res.json(newSalary);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Update a salary
const updateSalary = async (req, res) => {
  const { id } = req.params;
  const { employeeId, amount, date } = req.body;

  try {
    let salary = await Salary.findByPk(id);
    if (!salary) {
      return res.status(404).json({ msg: 'Salary not found' });
    }

    salary.employeeId = employeeId;
    salary.amount = amount;
    salary.date = date;

    await salary.save();

    res.json(salary);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Delete a salary
const deleteSalary = async (req, res) => {
  const { id } = req.params;

  try {
    const salary = await Salary.findByPk(id);
    if (!salary) {
      return res.status(404).json({ msg: 'Salary not found' });
    }

    await salary.destroy();

    res.json({ msg: 'Salary deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getSalaries,
  addSalary,
  updateSalary,
  calculateSalary,
  deleteSalary
};
