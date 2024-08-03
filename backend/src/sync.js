//backend\src\sync.js
const sequelize = require('../config/database');
const Employee = require('../models/employeeModel');

sequelize.sync({ alter: true }).then(async () => {
  console.log('Database synchronized');

  // Backup the existing Employees table if needed
  try {
    await sequelize.query('CREATE TABLE IF NOT EXISTS Employees_backup AS SELECT * FROM Employees');
    console.log('Backup created successfully');
  } catch (error) {
    console.error('Error creating backup:', error);
  }
}).catch((error) => {
  console.error('Error synchronizing database:', error);
});
