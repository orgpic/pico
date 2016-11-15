var passport = require('passport');
var path = require('path')
var LocalStrategy = require('passport-local').Strategy;
var db = require('../config');
var User = require('../../models/User');

passport.serializeUser(function(user, done) {
    console.log('serializing')

  done(null, user);
});

passport.deserializeUser(function(user, done) {
  console.log('deserializing');
  User.find({where: {id: user.id}}).then(function(user) {
    done(null, user);
  }).catch(function(err) {
    done(err, null);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('finding one', username, password)
    console.log('done', done)
    User.findOne({where: { username: username }})
      .then( function(user) {
        console.log('user', user.dataValues)
         if (!user) { return done(null, false); }
         //if (!user.verifyPassword(password)) { return done(null, false); }
         return done(null, true, user.dataValues);
         })
      .catch(function(err){
         if (err) { return done(err); }
      })
  }
));

// passport.use('local-login', new LocalStrategy({
//   passReqToCallback: true
// },
//   function(req, username, password, done) {
//     console.log('trtingfsgsdfgsd s');
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (!user.verifyPassword(password)) { return done(null, false); }
//       return done(null, user);
//     });
//   }
// ));