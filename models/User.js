const db = require('../db/config.js');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const User = db.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  salt: Sequelize.STRING,
  bio: Sequelize.TEXT
  }, 
  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      validPassword: function(password, passwd, user) {
      }
    }
  });

module.exports = User;