//gradingFormController.js
const GradingForm = require('../models/gradingFormModel');
const { addSalary } = require('./salaryController');

// Add a new grading form
const addGradingForm = async (req, res) => {
  try {
    const { date, formNumber, weight, grade, headcount, employeeId } = req.body;
    const newForm = await GradingForm.create({ date, formNumber, weight, grade, headcount, employeeId });
    
    // Calculate and add salary
    await addSalary({
      body: {
        employeeId,
        date,
        gradingFormId: newForm.id,
        weight,
        grade,
        headcount
      }
    }, res);

    res.status(201).json(newForm);
  } catch (error) {
    console.error('Error adding grading form:', error);
    res.status(500).json({ message: 'Error adding grading form', error });
  }
};

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

// Edit an existing grading form
const editGradingForm = async (req, res) => {
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
    await addSalary({
      body: {
        employeeId,
        date,
        gradingFormId: gradingForm.id,
        weight,
        grade,
        headcount
      }
    }, res);

    res.json(gradingForm);
  } catch (error) {
    console.error('Error editing grading form:', error);
    res.status(500).json({ message: 'Error editing grading form', error });
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

    await gradingForm.destroy();
    res.json({ msg: 'Grading form removed' });
  } catch (error) {
    console.error('Error deleting grading form:', error);
    res.status(500).json({ message: 'Error deleting grading form', error });
  }
};

module.exports = { addGradingForm, getGradingForms, editGradingForm, deleteGradingForm };


