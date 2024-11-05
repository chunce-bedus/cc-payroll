// controllers/salaryController.js
const Salary = require('../models/salaryModel');
const GradingForm = require('../models/gradingFormModel');

// Calculate salary based on grading form details
const calculateSalaryAmount = (grade, weight, headcount) => {
  const numericGrade = parseFloat(grade); // Convert grade to a number
  let rate;

  switch (true) {
    case (numericGrade >= 98):
      rate = 10.00;
      break;
    case (numericGrade === 97):
      rate = 8.50;
      break;
    case (numericGrade === 96):
      rate = 7.50;
      break;
    case (numericGrade === 95):
      rate = 6.50;
      break;
    case (numericGrade === 94):
      rate = 6.00;
      break;
    case (numericGrade === 93):
      rate = 5.50;
      break;
    case (numericGrade === 92):
      rate = 5.00;
      break;
    case (numericGrade === 91):
      rate = 4.50;
      break;
    case (numericGrade === 90):
      rate = 4.00;
      break;
    default:
      rate = 3.00;
      break;
  }

  // Calculate the salary
  const amount = (weight * rate) / headcount;

  // Return the salary rounded to 2 decimal points as a number
  return Math.round(amount * 100) / 100;
};

// Get all salaries
const getSalaries = async (req, res) => {
  try {
    const salaries = await Salary.findAll();
    res.json(salaries);
  } catch (error) {
    console.error('Error fetching salaries:', error);
    res.status(500).json({ message: 'Error fetching salaries', error });
  }
};

// Add a new salary entry
const addSalary = async (req, res) => {
  const { employeeId, date, gradingFormId, weight, grade, headcount } = req.body;

  try {
    // Calculate salary as a float with two decimal precision
    const amount = calculateSalaryAmount(grade, weight, headcount);
    
    // Create the salary entry
    const salary = await Salary.create({ employeeId, date, gradingFormId, amount });
    
    // Send response
    res.status(201).json(salary);
  } catch (error) {
    console.error('Error adding salary:', error);
    res.status(500).json({ message: 'Error adding salary', error });
  }
};

// Get all salaries by employeeId
const getSalariesByEmployee = async (req, res) => {
  const { employeeId } = req.params;

  try {
    const salaries = await Salary.findAll({ where: { employeeId } });
    if (salaries.length === 0) {
      return res.status(404).json({ message: 'No salaries found for this employee' });
    }
    res.json(salaries);
  } catch (error) {
    console.error('Error fetching salaries by employeeId:', error);
    res.status(500).json({ message: 'Error fetching salaries', error });
  }
};

/*// Calculate salary based on grading form details
const calculateSalaryAmount = (req, res) => {
  const { grade, weight, headcount } = req.body;

  try {
    const amount = calculateSalaryAmount(grade, weight, headcount); // Already returns a float
    res.json({ amount });
  } catch (error) {
    console.error('Error calculating salary:', error);
    res.status(500).json({ message: 'Error calculating salary', error });
  }
};*/

module.exports = { getSalaries, addSalary, calculateSalaryAmount, getSalariesByEmployee };
