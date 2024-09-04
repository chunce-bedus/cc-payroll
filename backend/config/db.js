const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_CONNECTION_STRING || './payroll.db',
  logging: false, // Set to true if you want to see SQL queries in the console
});

sequelize.authenticate()
  .then(() => console.log('Connected to SQLite database.'))
  .catch(err => console.error('Unable to connect to the database:', err));
 
 (async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to SQLite database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
