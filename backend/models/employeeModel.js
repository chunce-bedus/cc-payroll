// models/employeeModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path as needed

const Employee = sequelize.define('Employee', {
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
});

module.exports = Employee;
