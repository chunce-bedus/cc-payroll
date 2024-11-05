// gradingFormController.js
const GradingForm = require('../models/gradingFormModel');
const Employee = require('../models/employeeModel');

// Calculate salary based on grading form details
const calculateSalaryAmount = (grade, weight, headcount) => {
  let rate;

  switch (true) {
    case (grade >= 98):
      rate = 10.00;
      break;
    case (grade === 97):
      rate = 8.50;
      break;
    case (grade === 96):
      rate = 7.50;
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
    newForm.salaryAmount = calculateSalaryAmount(grade, weight, headcount); // Assuming salaryAmount is a field in GradingForm model
    await newForm.save(); // Save the new salary amount

    // Update cumulative salary for the employee
    await Employee.increment('cumulativeSalary', { by: newForm.salaryAmount, where: { employeeId } });

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

    // Calculate old salary amount for adjustment
    const oldAmount = gradingForm.salaryAmount;

    // Update grading form details
    gradingForm.date = date || gradingForm.date;
    gradingForm.formNumber = formNumber || gradingForm.formNumber;
    gradingForm.weight = weight || gradingForm.weight;
    gradingForm.grade = grade || gradingForm.grade;
    gradingForm.headcount = headcount || gradingForm.headcount;

    // Calculate new salary amount and save
    gradingForm.salaryAmount = calculateSalaryAmount(gradingForm.grade, gradingForm.weight, gradingForm.headcount);
    await gradingForm.save();

    // Update cumulative salary
    const difference = gradingForm.salaryAmount - oldAmount; // Calculate the difference
    await Employee.increment('cumulativeSalary', { by: difference, where: { id: gradingForm.employeeId } });

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

    // Save the salary amount to adjust cumulative salary later
    const amount = gradingForm.salaryAmount;

    // Delete the grading form
    await gradingForm.destroy();

    // Decrease cumulative salary
    await Employee.increment('cumulativeSalary', { by: -amount, where: { id: gradingForm.employeeId } });
    
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
