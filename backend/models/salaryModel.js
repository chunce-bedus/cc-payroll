// backend/models/salaryModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Salary = sequelize.define('Salary', {
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = Salary;
