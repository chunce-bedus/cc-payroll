// backend/routes/gradingFormRoutes.js
const express = require('express');
const { getGradingForms, addGradingForm, updateGradingForm, deleteGradingForm } = require('../controllers/gradingFormController');
const router = express.Router();

router.post('/', addGradingForm); // For adding
router.get('/', getGradingForms); // For reading
router.put('/', updateGradingForm); // For updating
router.delete('/', deleteGradingForm); // For deleting

module.exports = router;
