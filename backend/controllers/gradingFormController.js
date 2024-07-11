const GradingForm = require('../models/gradingFormModel');

const getGradingForms = async (req, res) => {
  const forms = await GradingForm.findAll();
  res.json(forms);
};

const addGradingForm = async (req, res) => {
  const { date, formNumber, weight, grade, headcount } = req.body;
  const newForm = await GradingForm.create({ date, formNumber, weight, grade, headcount });
  res.status(201).json(newForm);
};

module.exports = { getGradingForms, addGradingForm };
