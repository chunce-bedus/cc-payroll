// backend/middleware/validationMiddleware.js
const { check, validationResult } = require('express-validator');

// Middleware for validating employee updates
const validateEmployeeUpdate = [
  check('name').optional().isString().withMessage('Name must be a string'),
  check('email').optional().isEmail().withMessage('Invalid email address'),
  check('collectionCenter').optional().isString().withMessage('Collection center must be a string'),
  check('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateEmployeeUpdate };
