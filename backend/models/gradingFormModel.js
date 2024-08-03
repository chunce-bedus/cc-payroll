//gradingFormModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const GradingForm = sequelize.define('GradingForm', {
  employeeId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Employees', // Make sure this matches the name of the employee model
      key: 'id',
    },
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  formNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  grade: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  headcount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
});

module.exports = GradingForm;
