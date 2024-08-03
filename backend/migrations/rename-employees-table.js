'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename existing Employees table to Employees_backup
    await queryInterface.renameTable('Employees', 'Employees_backup');

    // Create a new Employees table with updated schema
    await queryInterface.createTable('Employees', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      collectionCenter: {
        type: Sequelize.STRING,
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
  },

  down: async (queryInterface, Sequelize) => {
    // Code to revert the changes if necessary
    // For example, you might want to drop the new Employees table and rename the backup table back to Employees
    await queryInterface.dropTable('Employees');
    await queryInterface.renameTable('Employees_backup', 'Employees');
  },
};
