// backend/routes/employeeModel.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path if necessary

sequelize.sync({ alter: true }).then(() => {
  console.log('Database synchronized');
}).catch((error) => {
  console.error('Error synchronizing database:', error);
});

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
