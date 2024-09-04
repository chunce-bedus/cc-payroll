//salaryController.js
const Salary = require('../models/salaryModel');
const GradingForm = require('../models/gradingFormModel');

// Calculate salary based on grading form details
const calculateSalary = (grade, weight, headcount) => {
  let rate;

  switch (true) {
    case (grade >= 98):
      rate = 10.00;
      break;
    case (grade === 97):
      rate = 9.70;
      break;
    case (grade === 96):
      rate = 8.50;
      break;
    case (grade === 95):
      rate = 6.50;
      break;
    case (grade === 94):
      rate = 6.00;
      break;
    case (grade === 93):
      rate = 5.50;
      break;
    case (grade === 92):
      rate = 5.00;
      break;
    case (grade === 91):
      rate = 4.50;
      break;
    case (grade === 90):
      rate = 4.00;
      break;
    default:
      rate = 3.00;
      break;
  }

  return weight * rate / headcount;
};

// Add a new salary entry
const addSalary = async (req, res) => {
  const { employeeId, date, gradingFormId, weight, grade, headcount } = req.body;

  try {
    const amount = calculateSalary(grade, weight, headcount);
    
    // Create a new salary entry
    const newSalary = await Salary.create({ employeeId, date, amount, GradingFormId: gradingFormId });
    res.status(201).json(newSalary);
  } catch (error) {
    console.error('Error adding salary:', error);
    res.status(500).json({ message: 'Error adding salary', error });
  }
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

module.exports = { getSalaries, addSalary };

