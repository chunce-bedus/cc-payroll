const express = require('express');
const { getGradingForms, addGradingForm } = require('../controllers/gradingFormController');
const router = express.Router();

router.get('/', getGradingForms);
router.post('/', addGradingForm);

module.exports = router;
