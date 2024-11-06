//20241106030554-modify-unique-constraint.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('GradingForms', 'GradingForms_formNumber_unique'); // Remove the old unique constraint
    await queryInterface.addConstraint('GradingForms', {
      fields: ['formNumber', 'employeeId'],
      type: 'unique',
      name: 'GradingForms_formNumber_employeeId_unique' // Adding composite unique constraint
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('GradingForms', 'GradingForms_formNumber_employeeId_unique');
    await queryInterface.addConstraint('GradingForms', {
      fields: ['formNumber'],
      type: 'unique',
      name: 'GradingForms_formNumber_unique' // Revert to the original unique constraint if rolling back
    });
  }
};
