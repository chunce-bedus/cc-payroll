//db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_CONNECTION_STRING || './payroll.db', // Use relative path
  logging: false, // Set to true if you want to see SQL queries in the console
  dialectOptions: {
    timeout: 10000, // 10 seconds timeout to prevent SQLITE_BUSY errors
  },
});

sequelize.authenticate()
  .then(async () => {
    console.log('Connected to SQLite database.');
    try {
      await sequelize.query('PRAGMA journal_mode = WAL;'); // Enable WAL mode
      console.log('WAL mode enabled.');
    } catch (error) {
      console.error('Error enabling WAL mode:', error);
    }
  })
  .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
