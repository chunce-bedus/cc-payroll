//index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet'); // Optional, for additional security
const path = require('path');
const sqlite3 = require('sqlite3').verbose(); // Assuming you are using SQLite
const sequelize = require('../config/db'); // Adjusted to reflect your directory structure
const Employee = require('../models/employeeModel');
const GradingForm = require('../models/gradingFormModel');
const Salary = require('../models/salaryModel');

// Synchronize models with the database
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => console.error('Error creating database tables:', err));

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000; // Set port from environment or default to 5000

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(helmet()); // Add security headers (optional)

// Static files (if needed)
app.use(express.static(path.join(__dirname, 'public')));

// SQLite database setup
const db = new sqlite3.Database('./payroll.db', (err) => {
  if (err) {
    console.error('Failed to connect to database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Define routes
app.use(express.json());
app.use('/api/employees', require('../routes/employeeRoutes')); 
app.use('/api/gradingforms', require('../routes/gradingFormRoutes'));
app.use('/api/salary', require('../routes/salaryRoutes'));


// Health check route
app.get('/', (req, res) => {
  res.send('Welcome to the CC Payroll backend!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
