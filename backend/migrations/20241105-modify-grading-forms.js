// Migration file for dropping Salaries table and adding amount column to GradingForms
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Drop the Salaries table
    await queryInterface.dropTable('Salaries');

    // Add the amount column to the GradingForms table
    await queryInterface.addColumn('GradingForms', 'amount', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Recreate the Salaries table
    await queryInterface.createTable('Salaries', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      gradingFormId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'GradingForms',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      employeeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Employees',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      amount: {
        type: Sequelize.FLOAT,
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
    });

    // Remove the amount column from GradingForms
    await queryInterface.removeColumn('GradingForms', 'amount');
  },
};
