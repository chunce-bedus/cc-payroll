//salaryModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Employee = require('./employeeModel');
const GradingForm = require('./gradingFormModel');

const Salary = sequelize.define('Salary', {
  GradingFormId: {
    type: DataTypes.INTEGER,
    references: {
      model: GradingForm,
      key: 'id',
    },
  },
  employeeId: {
    type: DataTypes.INTEGER,
    references: {
      model: Employee,
      key: 'id',
    },
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Salary;


