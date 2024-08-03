// backend/routes/gradingFormRoutes.js
const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getGradingForms, addGradingForm, updateGradingForm, deleteGradingForm } = require('../controllers/gradingFormController');

const router = express.Router();

router.post('/', protect, addGradingForm); // For adding
router.get('/', protect, getGradingForms); // For reading
router.put('/:id', protect, updateGradingForm); // For updating by ID
router.delete('/:id', protect, deleteGradingForm); // For deleting by ID

module.exports = router;

