// migration file (e.g., 20241106031856-modify-unique-constraint-formNumber-employeeId.js)
module.exports = {
    up: async (queryInterface, Sequelize) => {
      // Remove old unique constraint if exists
      await queryInterface.removeConstraint('GradingForms', 'grading_form_formNumber_employeeId');
      
      // Add composite unique constraint for 'formNumber' + 'employeeId'
      await queryInterface.addConstraint('GradingForms', {
        fields: ['formNumber', 'employeeId'],
        type: 'unique',
        name: 'grading_form_formNumber_employeeId',
      });
    },
    down: async (queryInterface, Sequelize) => {
      // Undo the changes in case we need to roll back the migration
      await queryInterface.removeConstraint('GradingForms', 'grading_form_formNumber_employeeId');
    }
  };
  