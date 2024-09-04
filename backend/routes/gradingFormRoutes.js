//gradingFormRoutes.js
const express = require('express');
const router = express.Router();
const gradingFormController = require('../controllers/gradingFormController');

// Route to add a new grading form
router.post('/', gradingFormController.addGradingForm);

// Route to get all grading forms
router.get('/', gradingFormController.getGradingForms);

// Route to edit an existing grading form
router.put('/:id', gradingFormController.editGradingForm);

// Route to delete a grading form
router.delete('/:id', gradingFormController.deleteGradingForm);

module.exports = router;


