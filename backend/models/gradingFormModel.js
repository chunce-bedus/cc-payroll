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
    unique: true,
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
      model: Employee, // Use the model reference
      key: 'employeeId',
    },
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Define associations
GradingForm.belongsTo(Employee, { foreignKey: 'employeeId', onDelete: 'CASCADE' });

module.exports = GradingForm;
