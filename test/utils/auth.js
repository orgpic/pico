import { expect } from 'chai';
import Sequelize from 'sequelize';
import User from '../../models/User.js';
const express = require('express');
const router = express.Router();
const port = process.env.PORT || 3000;
const host = `http://localhost:${port}`;
const app = require('../../app.js');
var oldRequest = require('request');
const request = oldRequest.defaults({jar: true});

const options = {
  username: 'user',
  password: 'pass11'
};

module.exports = {
  clearUser: function(callback) {
    console.log('clearingclearingclearing');
    User.find({username: 'user'})
    .then(function(user) {
      if (user) {
        console.log('found user, destring then creatings');
        user.destroy()
        .then(function() {
          callback();
        });
      } else {
        callback();
      }
    })
    .catch(function(err) {
      console.error('we have a find errorrrrr', err);
    });
  },

  localSignup: function (callback) {
    var options = {
      uri: `${host}/auth/signup`,
      method: 'POST',
      json: {
        username: 'user',
        password: 'pass11'
      }
    };
    request(options, function(err, result) {
      console.log('akjlhjladfshjkldfhjkakhjlakjlalkadkljadfkhjlfads',err, result)
      if (err) {
        console.log('error', err);
        return;
      }
      callback(result);
    });
  },

  authenticate: function(callback) {
    var options = {
      uri: `${host}/auth/authenticate`,
      method: 'POST',
      json: {
        username: 'user',
        password: 'pass11'
      }
    };
    request(options, function(err, result) {
      if (err) {
        console.log('error', err);
        return;
      }
      callback(result);
    });
  }, 

  testSession: function(callback) {
    var options = {
      uri: `${host}/auth/oAuth`,
      method: 'GET',
    };
    request(options, function(err, result, body) {
      if (err) {
        console.log(err);
        return;
      } 
      if (typeof body === 'string' && body.length > 0) {
        console.log('testSessoooontestSessoooontestSessoooonteboooooooooooodddddddyyyyy', JSON.parse(body).username)
        callback(JSON.parse(body).username);
      } else {
        callback(body);
      }
      
    });
  },

  signOut: function(callback) {
     var options = {
      uri: `${host}/logout`,
      method: 'GET',
    };
    request(options, function(err, results) {
      if (err) {
        console.log('error', err);
        return;
      }
      callback();
    });
  }
};

