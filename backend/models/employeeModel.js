// employeeModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Employee = sequelize.define('Employee', {
  employeeId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  collectionCenter: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cumulativeSalary: {
    type: DataTypes.DECIMAL(10, 2), // Adjust as necessary
    defaultValue: 0.00,
  },
}, {
  timestamps: true,
});

// Additional validations if needed
Employee.beforeCreate((employee) => {
  if (!employee.email || !employee.password) {
    throw new Error('Email and password are required.');
  }
});

module.exports = Employee;
