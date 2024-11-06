// employeeModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Define the Employee model
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
    unique: true, // Email must be unique for each employee
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
    type: DataTypes.DECIMAL(10, 2), // The salary will be a decimal value (10 digits total, 2 after decimal)
    defaultValue: 0.00, // Default salary is 0.00
  },
}, {
  timestamps: true, // Enables 'createdAt' and 'updatedAt' fields
});

// Hook to ensure required fields are provided
Employee.beforeCreate((employee) => {
  if (!employee.email || !employee.password) {
    throw new Error('Email and password are required.');
  }
});

module.exports = Employee;

