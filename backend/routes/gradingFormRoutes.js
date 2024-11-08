//gradingFormRoutes.js
const express = require('express');
const router = express.Router();
const gradingFormController = require('../controllers/gradingFormController');

// Route to add a new grading form
router.post('/', gradingFormController.addGradingForm);

// Route to edit an existing grading form
router.put('/:id', gradingFormController.updateGradingForm);

// Route to delete a grading form
router.delete('/:id', gradingFormController.deleteGradingForm);

// Route to get grading forms by employeeId
router.get('/employee/:employeeId', gradingFormController.getGradingFormsByEmployee);

module.exports = router;



