var passport = require('passport');
var path = require('path');
var Strategy = require('passport-local')
var db = require('../config');
var User = require('../../models/User');
const bcrypt = require('bcrypt');
var GitHubStrategy = require('passport-github').Strategy;


passport.use(new Strategy({  
  passReqToCallback : true
},
  function(req, username, password, done) {
    User.findOne({where: { username: username }})
    .then( function(user) {
      console.log('found one', user)
      if (!user) {
        return done(null, false, { message: 'No User Found.' });        
      } else {
        bcrypt.compare(password, user.dataValues.password, function(err, isMatch) {
          if (err) {
            console.log('bycrupt match error');
              done(err);
          } 
          if (isMatch) {
            console.log('bycrypt match good');
              done(null, isMatch, user);
          } else {
            console.log('bycrtup match bad', isMatch);
              done(null, false, { message: 'No User Found.' });
          }
        });
      }
    }).catch(function(err) {
      done(err, null, null);
    });
  }
));



passport.use(new GitHubStrategy({
    clientID: 'f864f0df17178ff53b7b',
    clientSecret: 'd37ad17231f09cf864805e8ffa832b56ba59a855',
    callbackURL: "http://localhost/auth/githubAuth"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));