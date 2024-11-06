// gradingFormController.js
const GradingForm = require('../models/gradingFormModel');
const Employee = require('../models/employeeModel');
const sequelize = require('../config/db');  // Make sure to adjust the path if needed

// Calculate salary based on grading form details
const calculateSalaryAmount = (grade, weight, headcount) => {
  let rate;

  // Define rate based on grade
  if (grade >= 98) {
    rate = 10.00;
  } else if (grade === 97) {
    rate = 8.50;
  } else if (grade === 96) {
    rate = 7.50;
  } else if (grade === 95) {
    rate = 6.50;
  } else if (grade === 94) {
    rate = 6.00;
  } else if (grade === 93) {
    rate = 5.50;
  } else if (grade === 92) {
    rate = 5.00;
  } else if (grade === 91) {
    rate = 4.50;
  } else if (grade === 90) {
    rate = 4.00;
  } else {
    rate = 3.00;  // For grades below 90
  }

  // Calculate the salary
  const amount = (weight * rate) / headcount;

  // Return the salary rounded to 2 decimal points
  return Math.round(amount * 100) / 100;
};

// Add a new grading form
const addGradingForm = async (req, res) => {
  const { date, formNumber, weight, grade, headcount, employeeId } = req.body;

  // Basic validation
  if (!date || !formNumber || !weight || !grade || !headcount || !employeeId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if a grading form with the same form number already exists
  const existingForm = await GradingForm.findOne({ where: { formNumber, employeeId } });
  if (existingForm) {
    return res.status(400).json({ message: 'Grading form already exists; please edit it instead.' });
  }

  try {
    const newForm = await GradingForm.create({ date, formNumber, weight, grade, headcount, employeeId });
    
    // Calculate and store salary directly in the grading form
    newForm.amount = calculateSalaryAmount(grade, weight, headcount); // Assuming salaryAmount is a field in GradingForm model
    await newForm.save(); // Save the new salary amount

    // Update cumulative salary for the employee
    await Employee.increment('cumulativeSalary', { by: newForm.amount, where: { employeeId } });

    res.status(201).json(newForm);
  } catch (error) {
    console.error('Error adding grading form:', error);
    res.status(500).json({ message: 'Internal server error while adding grading form' });
  }
};

// Edit an existing grading form
const updateGradingForm = async (req, res) => {
  const { id } = req.params;
  const { date, formNumber, weight, grade, headcount } = req.body;

  try {
    const gradingForm = await GradingForm.findByPk(id);
    if (!gradingForm) {
      return res.status(404).json({ message: 'Grading form not found' });
    }

    const oldAmount = gradingForm.amount;  // Change salaryAmount to amount

    // Validate values
    if (isNaN(weight) || isNaN(grade) || isNaN(headcount)) {
      return res.status(400).json({ message: 'Invalid grading form values' });
    }

    // Update grading form details
    gradingForm.date = date || gradingForm.date;
    gradingForm.formNumber = formNumber || gradingForm.formNumber;
    gradingForm.weight = weight || gradingForm.weight;
    gradingForm.grade = grade || gradingForm.grade;
    gradingForm.headcount = headcount || gradingForm.headcount;

    const newAmount = calculateSalaryAmount(gradingForm.grade, gradingForm.weight, gradingForm.headcount);

    // Ensure valid number
    if (isNaN(newAmount)) {
      return res.status(400).json({ message: 'Invalid salary calculation' });
    }

    gradingForm.amount = newAmount;  // Update to 'amount' field
    await gradingForm.save();

    // Calculate the difference
    const difference = newAmount - oldAmount;

    if (isNaN(difference)) {
      return res.status(400).json({ message: 'Salary difference is invalid' });
    }

    // Log for debugging
    console.log('Old Amount:', oldAmount);
    console.log('New Amount:', newAmount);
    console.log('Difference:', difference);

    // Update cumulative salary for the employee
    await Employee.update(
      { cumulativeSalary: sequelize.literal(`cumulativeSalary + ${difference}`) },
      { where: { employeeId: gradingForm.employeeId } }
    );

    res.json(gradingForm);
  } catch (error) {
    console.error('Error editing grading form:', error);
    res.status(500).json({ message: 'Internal server error while editing grading form' });
  }
};
// Delete a grading form
const deleteGradingForm = async (req, res) => {
  const { id } = req.params;

  try {
    const gradingForm = await GradingForm.findByPk(id);
    if (!gradingForm) {
      return res.status(404).json({ message: 'Grading form not found' });
    }

    const amount = gradingForm.amount;  // Correctly getting the amount

    // Delete the grading form
    await gradingForm.destroy();

    // Ensure amount is a valid number before updating
    if (isNaN(amount)) {
      return res.status(400).json({ message: 'Invalid amount, cannot update cumulative salary' });
    }

    // Recalculate cumulative salary by summing all remaining grading form amounts for the employee
    const gradingForms = await GradingForm.findAll({ where: { employeeId: gradingForm.employeeId } });

    const newCumulativeSalary = gradingForms.reduce((total, form) => total + form.amount, 0);

    // Update cumulative salary for the employee with the new total
    await Employee.update(
      { cumulativeSalary: newCumulativeSalary },
      { where: { employeeId: gradingForm.employeeId } }
    );

    res.json({ message: 'Grading form removed successfully' });
  } catch (error) {
    console.error('Error deleting grading form:', error);
    res.status(500).json({ message: 'Internal server error while deleting grading form' });
  }
};

// Get grading forms by employeeId
const getGradingFormsByEmployee = async (req, res) => {
  const { employeeId } = req.params;

  try {
    const forms = await GradingForm.findAll({ where: { employeeId } });
    if (forms.length === 0) {
      return res.status(404).json({ message: 'No grading forms found for this employee' });
    }
    res.json({ forms });
  } catch (error) {
    console.error('Error fetching grading forms by employeeId:', error);
    res.status(500).json({ message: 'Internal server error while fetching grading forms' });
  }
};

module.exports = { addGradingForm, updateGradingForm, deleteGradingForm, getGradingFormsByEmployee };
