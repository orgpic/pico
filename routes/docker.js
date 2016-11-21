var express = require('express');
var router = express.Router();
const docker = require('../utils/dockerAPI');
var db = require('../db/config');
var User = require('../models/User');

router.post('/handleCodeSave', function (req, res) {
  const fileName = req.body.fileName;
  const containerName = req.body.containerName;
  const code = JSON.stringify(req.body.codeValue).replace(/'/g, "\\\"");
  const echo = "'echo -e ";
  const file = " > " + fileName + "'"
  const command = 'bash -c ' + echo + code + file;

  docker.runCommand(containerName, command, function(err, response) {
    if (err) {
      res.status(200).send(err);
    } else {
      res.status(200).send(response);
    }
  });
});


router.post('/cmd', function (req, res) {
  var cmd = req.body.cmd;
  var containerName = req.body.containerName;
    docker.runCommand(containerName, 'cat /picoShell/.pico', function(err1, res1) {
      console.log('response from cat /picoShell/.pico :', res1);
      console.log('this is the container name', containerName);

    if (err1) {
      res.status(404).send('Creating .pico');
    } else {
      res1 = res1.replace(/^\s+|\s+$/g, '');

      cmd = '"cd ' + res1 + ' && ' + cmd + '"';
      const command = 'bash -c ' + cmd;
      console.log(command);
      docker.runCommand(containerName, command, function(err2, res2) {
        if (err2) { res.status(200).send(err2); } 
        else { res.status(200).send(res2); }
      });
    }
  });
});


module.exports = router;