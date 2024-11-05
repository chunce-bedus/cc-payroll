//gradingFormController.js
const GradingForm = require('../models/gradingFormModel');
const Salary = require('../models/salaryModel');
const { addSalary } = require('./salaryController');

// Get all grading forms
const getGradingForms = async (req, res) => {
  try {
    const forms = await GradingForm.findAll();
    res.json(forms); 
  } catch (error) {
    console.error('Error fetching grading forms:', error);
    res.status(500).json({ message: 'Error fetching grading forms', error });
  }
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
    return res.status(400).json({ message: 'Formulir grading sudah ada, silakan edit formulir grading "nomor formulir" sebagai gantinya.' });
  }

  try {
    const newForm = await GradingForm.create({ date, formNumber, weight, grade, headcount, employeeId });
    
    // Calculate and add salary
    await addSalary({
      body: {
        employeeId,
        date,
        gradingFormId: newForm.gradingFormId,
        weight,
        grade,
        headcount
      }
    }, res);

    if (!res.headersSent) {
      res.status(201).json(newForm);
    }
  } catch (error) {
    console.error('Error adding grading form:', error);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Error adding grading form', error });
    }
  }
};

// Edit an existing grading form
const updateGradingForm = async (req, res) => {
  const { id } = req.params;
  const { date, formNumber, weight, grade, headcount, employeeId } = req.body;

  try {
    const gradingForm = await GradingForm.findByPk(id);
    if (!gradingForm) {
      return res.status(404).json({ msg: 'Grading form not found' });
    }

    // Update grading form details
    gradingForm.date = date || gradingForm.date;
    gradingForm.formNumber = formNumber || gradingForm.formNumber;
    gradingForm.weight = weight || gradingForm.weight;
    gradingForm.grade = grade || gradingForm.grade;
    gradingForm.headcount = headcount || gradingForm.headcount;
    gradingForm.employeeId = employeeId || gradingForm.employeeId;

    await gradingForm.save();

    // Recalculate and update salary
    await Salary.destroy({ where: { gradingFormId: id } });
    await addSalary({
      body: {
        employeeId,
        date: gradingForm.date,
        gradingFormId: gradingForm.gradingFormId,
        weight: gradingForm.weight,
        grade: gradingForm.grade,
        headcount: gradingForm.headcount
      }
    }, res);

    if (!res.headersSent) {
      res.json(gradingForm);
    }
  } catch (error) {
    console.error('Error editing grading form:', error);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Error editing grading form', error });
    }
  }
};

// Delete a grading form
const deleteGradingForm = async (req, res) => {
  const { id } = req.params;

  try {
    const gradingForm = await GradingForm.findByPk(id);
    if (!gradingForm) {
      return res.status(404).json({ msg: 'Grading form not found' });
    }

    // Delete associated salary entries
    await Salary.destroy({ where: { gradingFormId: id } });

    // Delete the grading form
    await gradingForm.destroy();
    res.json({ msg: 'Grading form and associated salary removed' });
  } catch (error) {
    console.error('Error deleting grading form:', error);
    res.status(500).json({ message: 'Error deleting grading form', error });
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
    res.json(forms);
  } catch (error) {
    console.error('Error fetching grading forms by employeeId:', error);
    res.status(500).json({ message: 'Error fetching grading forms', error });
  }
};

module.exports = { addGradingForm, getGradingForms, updateGradingForm, deleteGradingForm, getGradingFormsByEmployee };