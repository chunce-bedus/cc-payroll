const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet'); 
const path = require('path');
const sequelize = require('../config/database'); // Import the configured Sequelize instance
const gradingFormRoutes = require('../routes/gradingFormRoutes'); // Import the routes
const employeeRoutes = require('../routes/employeeRoutes');

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

// Sequelize setup
sequelize.authenticate()
  .then(() => {
    console.log('Connected to SQLite database.');

    // Sync all defined models to the DB
    sequelize.sync()
      .then(() => {
        console.log('Database & tables created!');
      })
      .catch(err => {
        console.error('Error syncing database:', err);
      });

  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Define routes
app.use('/api/employees', require('../routes/employeeRoutes')); 

// Other imports
const salaryRoutes = require('../routes/salaryRoutes');

// Use routes
app.use('/api/salary', salaryRoutes);
app.use('/api/gradingforms', gradingFormRoutes); // Use the routes
app.use('/api/employees', employeeRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('Welcome to the CC Payroll backend!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
