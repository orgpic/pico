var Sequelize = require('sequelize');
var connection = require('../db/db');

var Article = connection.define('article', {
  title: Sequelize.STRING,
  body: Sequelize.TEXT,
  approved: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Article;