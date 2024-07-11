const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const db = require('./config/db');
const employeeRoutes = require('./routes/employeeRoutes');
const gradingFormRoutes = require('./routes/gradingFormRoutes');
const salaryRoutes = require('./routes/salaryRoutes');

const app = express();

db.sync().then(() => console.log('Database connected'));

app.use(cors());
app.use(bodyParser.json());

app.use('/api/employees', employeeRoutes);
app.use('/api/gradingForms', gradingFormRoutes);
app.use('/api/salaries', salaryRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
