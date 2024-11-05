const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const sequelize = require('../config/db');

// Import models 
const Employee = require('../models/employeeModel');
const GradingForm = require('../models/gradingFormModel');
const Salary = require('../models/salaryModel');

// Import routes
const employeeRoutes = require('../routes/employeeRoutes');
const gradingFormRoutes = require('../routes/gradingFormRoutes');
const salaryRoutes = require('../routes/salaryRoutes');

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Static files (if needed)
app.use(express.static(path.join(__dirname, 'public')));

// Define model associations
Employee.hasMany(GradingForm, { foreignKey: 'employeeId', onDelete: 'CASCADE' });
Employee.hasMany(Salary, { foreignKey: 'employeeId', onDelete: 'CASCADE' });
GradingForm.hasMany(Salary, { foreignKey: 'gradingFormId', onDelete: 'CASCADE' });

// Sequelize setup
sequelize.authenticate()
  .then(() => {
    console.log('Connected to the database.');

    // Sync all defined models to the DB
    sequelize.sync({ force: false })
      .then(() => {
        console.log('Database & tables created!');
      })
      .catch(err => {
        console.error('Error syncing database:', err);
      });

  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Define routes
app.use('/api/employees', employeeRoutes);
app.use('/api/gradingforms', gradingFormRoutes);
app.use('/api/salaries', salaryRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('Welcome to the CC Payroll backend!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
