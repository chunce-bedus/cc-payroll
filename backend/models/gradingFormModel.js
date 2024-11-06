// gradingFormModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Employee = require('./employeeModel');

const GradingForm = sequelize.define('GradingForm', {
  gradingFormId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  formNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  grade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  headcount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  employeeId: {
    type: DataTypes.INTEGER,
    references: {
      model: Employee, // Ensure this matches the Employee model's primary key
      key: 'employeeId',  // Make sure 'employeeId' is the correct key in the Employee model
    },
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: true,  // amount can be nullable since it will be calculated
  },
}, {
  timestamps: true,
  // Composite unique constraint ensures the formNumber is unique per employee
  indexes: [
    {
      unique: true,
      fields: ['formNumber', 'employeeId'],
    },
  ],
});

// Define associations
GradingForm.belongsTo(Employee, { foreignKey: 'employeeId', onDelete: 'CASCADE' });

module.exports = GradingForm;

