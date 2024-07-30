// backend/config/database.js

const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config(); // Load environment variables

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, '../../payroll.db'), // Use an absolute path
});

module.exports = sequelize;
