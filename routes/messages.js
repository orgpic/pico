'use strict';
const express = require('express');
const router = express.Router();
const docker = require('../utils/dockerAPI');
const db = require('../db/config');
const Messages = require('../models/Messages');


router.post('/', function(req, res) {
  const obj = req.body;
  console.log('CREATING MESSAGE');
  Messages.create({
    userID: obj.username,
    containerID: obj.containerName,
    message: obj.message, 
  })
  .then(function(results) {
    res.status(200).send('Message Stored');
  })
  .catch(function(err) {
    res.status(500).send('Message Store Failed');
  });
});

router.get('/', function(req, res) {
  const obj = req.query;
  console.log('this is the body', obj);

  Messages.findAll({
    limit: 50,
    where: {
      containerID: obj.containerName
    },
    order: [ [ 'createdAt', 'DESC' ]]
  })
  .then(function(results) {
    res.status(200).send(results);
  })
  .catch(function(err) {
    res.status(500);
  });
});

module.exports = router;