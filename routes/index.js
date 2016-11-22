'use strict';
const express = require('express');
const router = express.Router();
const exec = require('child_process').exec;
var bcrypt = require('bcrypt');
const docker = require('../utils/dockerAPI');
var db = require('../db/config');
var User = require('../models/User');
var Collaborator = require('../models/Collaborator');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var sendgrid = require("sendgrid")("SENDGRID_APIKEY");
// var email = new sendgrid.Email();

// email.addTo("test@sendgrid.com");
// email.setFrom("you@youremail.com");
// email.setSubject("Sending with SendGrid is Fun");
// email.setHtml("and easy to do anywhere, even with Node.js");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'picoShell' });
});

router.get('/linuxcomputer', function(req, res) {
  res.render('index', { title: 'picoShell' });
});

router.get('/dashboard', function(req, res) {
  res.render('index', { title: 'picoShell' });
});


router.post('/email', function(req, res) {
  console.log('reqreqreqreqreqrqewrqwrqw', req.body);
  sendgrid.send(req.body.email);
  res.send(req.body.email);
});

router.get('/infodashboard', function(req, res) {
  const username = req.query.username;
  User.findOne({
    where: {
      username: username
    }
  })
  .then(function(response) {
    console.log(response);
    res.send(200, response);
  })
  .catch(function(err) {
    res.send(500, err);
  });
});

router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    res.redirect('/');
  });
});

router.get('/github', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github', {
  session: true,
}),
  function(req, res) {
    console.log('trying to send statuskjhafdskjhadsfkjlhdaskjldafskjldsafkljadsfkljh', req.user);
    req.session.user = req.user;
    console.log('helloasdfkjadsklfdas');
    res.redirect('/');
  });

module.exports = router;