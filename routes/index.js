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
var domain = 'picoshell.com';
var api_key = process.env.MAILGUN_SECRET;
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
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
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(function(response) {
    console.log('response', response);
    var data = {
      from: 'The Pico Team <support@picoshell.com>',
      to: 'jchristian01@gmail.com',
      subject: 'Reseting you pasword',
      text: 'Testing some Mailgun awesomness!'
    };
    mailgun.messages().send(data, function (error, body) {
      if (error) {
        console.log(error);
      }
      console.log('bodybodybodybodybodybody', body);
      res.send(body);
    });
  })
  .catch(function(err) {
    console.log(err);
    res.send(err);
  });
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