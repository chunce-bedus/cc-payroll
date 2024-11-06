// migration file: 20241106050414-remove-duplicate-unique-constraint.js
module.exports = {
  async up(queryInterface) {
    // Remove the correct unique index by name
    await queryInterface.removeIndex('GradingForms', 'grading_forms_form_number_employee_id');
  },

  async down(queryInterface) {
    // Recreate the unique index in case of rollback
    await queryInterface.addIndex('GradingForms', ['formNumber', 'employeeId'], {
      name: 'grading_forms_form_number_employee_id',
      unique: true,
    });
  },
};
