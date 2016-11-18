const db = require('../db/config.js');
const Sequelize = require('sequelize');

const Collaborator = db.define('collaborator', {
  recieverUsername: Sequelize.STRING,
  requesterUsername: Sequelize.STRING,
  confirmed: Sequelize.STRING
}, {
	timestamps: false
});

module.exports = Collaborator;

console.log((`Filesystem      Size  Used Avail Use% Mounted on
none             60G   24G   33G  42% /
tmpfs          1000M     0 1000M   0% /dev
tmpfs          1000M     0 1000M   0% /sys/fs/cgroup
/dev/vda2        60G   24G   33G  42% /etc/hosts
shm              64M     0   64M   0% /dev/shm`).split("\n")[1].split('G')[3].split('/')[0].trim());