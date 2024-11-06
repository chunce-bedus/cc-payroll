// Migration file for adding cumulativeSalary column to Employees table
module.exports = {
    up: async (queryInterface, Sequelize) => {
      // Add the cumulativeSalary column to Employees table
      await queryInterface.addColumn('Employees', 'cumulativeSalary', {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        allowNull: false,
      });
    },
  
    down: async (queryInterface, Sequelize) => {
      // Remove the cumulativeSalary column from Employees table
      await queryInterface.removeColumn('Employees', 'cumulativeSalary');
    },
  };
  