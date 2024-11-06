module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('GradingForms', 'amount', {
      type: Sequelize.FLOAT,
      allowNull: true, // Set to false if you want this column to be mandatory
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('GradingForms', 'amount');
  },
};
