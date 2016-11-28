'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'videos',
      'videoDescription',
      {
        type: Sequelize.TEXT
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('videos', 'videoDescription', {type: Sequelize.STRING});
  }
};
