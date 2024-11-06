//20241106032347-add-composite-unique-grading-form.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('GradingForms', {
      fields: ['formNumber', 'employeeId'],
      type: 'unique',
      name: 'unique_form_employee_constraint',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('GradingForms', 'unique_form_employee_constraint');
  }
};
