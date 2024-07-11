const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_CONNECTION_STRING,
});

module.exports = sequelize;
