const express = require('express');
const router = express.Router();
const exec = require('child_process').exec;
const kue = require('kue');
const jobs = kue.createQueue();
var bcrypt = require('bcrypt');
const docker = require('../utils/dockerAPI');
var db = require('../db/config');
var User = require('../models/User');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res) {
  console.log(req);
  res.render('index', { title: 'picoShell' });
});

router.get('/decode', function(req, res) {
  console.log('trying to access decode');
  const decoded = jwtDecode(req.query.token);
  console.log(decoded);
  res.send(200, decoded)
});


router.post('/handleCodeSave', function (req, res) {
  console.log(req.body);
  const fileName = req.body.fileName;
  const containerName = req.body.containerName;
  const code = JSON.stringify(req.body.codeValue).replace(/'/g, "\\\"");
  const echo = "'echo -e ";
  const file = " > " + fileName + "'"
  const command = 'bash -c ' + echo + code + file;
  console.log(command);
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

  if(cmd.split(" ")[0] === 'cd') {
    const newdir = cmd.split(" ")[1];
    console.log('change dir to: ', newdir);

    const command = 'bash -c "echo ' + newdir + ' > /picoShell/.pico' + '"'; 
    console.log(command);

    docker.runCommand(containerName, command, function(err, res1) {
      if (err) { res.status(200).send(err); } 
      else { res.status(200).send(res1); }

    })
  } else if(cmd.split(" ")[0] === 'open') {
    docker.runCommand(containerName, 'cat ' + cmd.split(" ")[1], function(err1, res1) {
      console.log('err1', err1);
      console.log('res1', res1);
      if(err1) {
        res.status(200).send(err1);
      } else {
        res.status(200).send({termResponse: res1, fileOpen: true, fileName: cmd.split(" ")[1]});
      }
    });
  } else {
      docker.runCommand(containerName, 'cat /picoShell/.pico', function(err1, res1) {

        console.log('response from cat /picoShell/.pico :', res1);

        res1 = res1.replace(/^\s+|\s+$/g, '');

        cmd = '"cd ' + res1 + ' && ' + cmd + '"';
        const command = 'bash -c ' + cmd;
        console.log(command);

        docker.runCommand(containerName, command, function(err2, res2) {
          if (err2) { res.status(200).send(err2); } 
          else { res.status(200).send(res2); }
        docker.runCommand('juice', command, function(err2, res2) {
          if (err2) {
            res.status(200).send(err2);
          } else {
            res.status(200).send(res2);
          }
        });
      }) 
    })
  }
});

router.post('/signup', 
  function(req, res, done) {
    console.log('signing up: ', req.body.username);
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      const salty = salt;
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) {
          res.send('Error hashing the password', err);
        }
        passwordHashed = hash;
        const user = User.create({
          username: username,
          password: passwordHashed,
          salt: salty,
          bio: 'bio',
          authenticatedWith: 'local'
        })
        .then(function(response) {
          res.send(response);
        })
        .catch(function(err) {
          console.log(err.errors[0].type === 'unique violation');
          if (err.errors[0].type === 'unique violation') {
            res.send('user already exists');
          } else {
            res.send(err);
          }
        });
      });
    });
  });

User.updateOrCreate = function(user, cb) {
  if (user.authenticatedWith !== 'local') {
    User.findOne({where: {username: username}})
    .then(function(err, oldUser) {
      if (err) {
        console.log('err', err);
      } else if (!oldUser) {
        User.create({user});
      } else {
        User.findOne({where: {username: username}}).update({user});
      }
    }).then(function() {
      cb(null, user);
    });
  } else {
    cb(null, user);
  }
};

function generateToken(req, res, next) {
  req.token = jwt.sign({
    id: req.user.id,
  }, 'server secret', {
    expiresIn: 7200
  });
  next();
}

function serialize(req, res, next) {
  var user = req.authInfo.dataValues;
  User.updateOrCreate(user, function(err, user) {
    if (err) {
      return next(err);
    }
    req.user = user
    next();
  });
}

router.post('/login', 
  passport.authenticate('local', {
    session: false
  }), serialize, generateToken,
  function(req, res) {
    console.log('trying to send status', req.user, req.token);
    res.status(200).json({
      user: req.user,
      token: req.token
    });
  }
);


router.get('*', function(req, res, next) {
  res.render('index', { title: 'picoShell' });
});

module.exports = router;