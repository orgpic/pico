const should = require("should");
import { expect } from 'chai';
import Sequelize from 'sequelize';
import User from '../../models/User.js';
const express = require('express');
const router = express.Router();
const port = process.env.PORT || 3000;
const host = `http://localhost:${port}`;
const request = require('request');

describe('Local Signup/Login test', function () {
  const requestWithSession = request.defaults({jar: true});
  before(function(done) {   
    User.find({username: 'user'})
    .then(function(user) {
      console.log(`${host}/auth/signup`);
      const options = {
        method: 'POST',
        uri: `${host}/auth/signup`,
        json: {
          username: 'user',
          password: 'pass11'
        }
      };
      if (user) {
        console.log('found user, destring then creatings');
        user.destroy().then(function() {
          request(options, function(err, data) {
            console.log('first set of data', data);
            if (err) {
              console.log('we have an error creating a user111', err);
              done(err);
            } else {
              done();
            }
          });
        });
      } else {
        console.log('creating user, no user found');
        request(options, function(err, data) {
          console.log('data data data data data data', err, data.body);
          console.log('err err err err errr', err);
          if (err) {
            console.log('we have an error creating a user222', err);
            done(err);
          } else {
            done();
          }
        });
      }
    })
    .catch(function(err) {
      console.error('we have a find errorrrrr', err);
    });
  });

  console.log('running');
  it('should create a session', function (done) {
    console.log('creating a sessions test test test');
    const options = {
      method: 'POST',
      uri: `${host}/auth/authenticate`,
      json: {
        username: 'user',
        password: 'pass11'
      }
    };
    request(options, function(err, data) {
      console.log('daaaaaataaaaa', data.body);
      if (err) {
        console.log('ererererererererere', err);
      } else {
        expect(data.body.username).to.equal('user');
        done();
      }
    });
  });

  after(function(done) {
      User.destroy({where: { username: 'user'}}).then(function() {
        done();
      });
    });
})