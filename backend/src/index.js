const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet'); // Optional, for additional security
const path = require('path');
const { Sequelize } = require('sequelize'); // Import Sequelize
const employeeRoutes = require('../routes/employeeRoutes'); // Adjust the path if necessary

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

// Sequelize setup
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './payroll.db'
});

// Import models
const Employee = require('../models/employeeModel'); // Adjust the path if necessary

// Sync models with the database
sequelize.authenticate()
  .then(() => {
    console.log('Connected to SQLite database.');
    return sequelize.sync(); // Sync all models
  })
  .then(() => {
    // Define routes
    app.use('/api/employees', employeeRoutes);

    // Health check route
    app.get('/', (req, res) => {
      res.send('Welcome to the CC Payroll backend!');
    });

    // Start server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
