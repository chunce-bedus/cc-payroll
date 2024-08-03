// backend/controllers/gradingFormController.js

const GradingForm = require('../models/gradingFormModel');

// Get all grading forms
const getGradingForms = async (req, res) => {
  try {
    const gradingForms = await GradingForm.findAll();
    res.json(gradingForms);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Add a new grading form
const addGradingForm = async (req, res) => {
  const { employeeId, date, formNumber, weight, grade, headcount } = req.body;

  try {
    const newGradingForm = await GradingForm.create({
      employeeId,
      date,
      formNumber,
      weight,
      grade,
      headcount
    });

    res.json(newGradingForm);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Update a grading form
const updateGradingForm = async (req, res) => {
  const { id } = req.params;
  const { employeeId, date, formNumber, weight, grade, headcount } = req.body;

  try {
    let gradingForm = await GradingForm.findByPk(id);
    if (!gradingForm) {
      return res.status(404).json({ msg: 'Grading form not found' });
    }

    gradingForm.employeeId = employeeId;
    gradingForm.date = date;
    gradingForm.formNumber = formNumber;
    gradingForm.weight = weight;
    gradingForm.grade = grade;
    gradingForm.headcount = headcount;

    await gradingForm.save();

    res.json(gradingForm);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
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

    res.json({ msg: 'Grading form deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getGradingForms,
  addGradingForm,
  updateGradingForm,
  deleteGradingForm
};
