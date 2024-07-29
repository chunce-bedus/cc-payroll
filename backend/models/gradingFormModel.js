// backend/models/gradingFormModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const GradingForm = sequelize.define('GradingForm', {
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  formNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  grade: {
    type: DataTypes.STRING,
    allowNull: false
  },
  headcount: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = GradingForm;
