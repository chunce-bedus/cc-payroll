const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const GradingForm = db.define('GradingForm', {
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
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  headcount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = GradingForm;
