const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path if necessary

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
}, {
  // Other model options go here
});

module.exports = Employee;
