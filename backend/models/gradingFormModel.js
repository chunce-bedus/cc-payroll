// models/gradingFormModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path as needed
const Employee = require('./employeeModel'); // Import the Employee model

const GradingForm = sequelize.define('GradingForm', {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  formNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  grade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  headcount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    references: {
      model: Employee,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt columns
  indexes: [
    {
      unique: true,
      fields: ['formNumber', 'employeeId']
    }
  ]
});

module.exports = GradingForm;
