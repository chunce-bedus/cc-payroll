'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Add a unique constraint on the combination of formNumber and employeeId
    await queryInterface.createTable('GradingForms', {
      gradingFormId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      formNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      weight: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      grade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      headcount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      employeeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Employees',
          key: 'employeeId',
        },
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      amount: {
        type: Sequelize.FLOAT,
      },
    });

    // Add unique constraint for formNumber and employeeId
    await queryInterface.addConstraint('GradingForms', {
      fields: ['formNumber', 'employeeId'],
      type: 'unique',
      name: 'unique_form_employee_constraint',
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop the table if rollback is needed
    await queryInterface.dropTable('GradingForms');
  },
};
