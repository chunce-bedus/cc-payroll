// sequelize-config.js
require('dotenv').config();

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: process.env.DB_CONNECTION_STRING || '../payroll.db',
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
  },
  production: {
    dialect: 'sqlite',
    storage: process.env.DB_CONNECTION_STRING || '../payroll.db',
  },
};
