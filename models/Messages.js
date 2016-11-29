const db = require('../db/config.js');
const Sequelize = require('sequelize');

const Messages = db.define('messages', {
    userID: Sequelize.STRING,
    containerID: Sequelize.STRING,
    message: Sequelize.STRING,
    createdAt: Sequelize.DATE
});

module.exports = Messages;