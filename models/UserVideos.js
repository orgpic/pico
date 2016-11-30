const db = require('../db/config.js');
const Sequelize = require('sequelize');

var UserVideos = db.define('uservideos', {
  userId: Sequelize.STRING,
  videoId: Sequelize.STRING
});

module.exports = UserVideos;
