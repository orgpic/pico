const Sequelize = require('sequelize');
const connection = new Sequelize('demo_schema', 'root', 'root');

module.exports = connection;