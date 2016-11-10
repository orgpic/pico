var Sequelize = require('sequelize');
var connection = require('../db/db');

var User = connection.define('user', {
  Username: Sequelize.STRING,
  Password: Sequelize.STRING,
  Salt: Sequelize.STRING,
  Bio: Sequelize.STRING
});

module.exports = User;