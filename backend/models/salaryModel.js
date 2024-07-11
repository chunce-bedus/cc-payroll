const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const Salary = db.define('Salary', {
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Salary;
