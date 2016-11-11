var express = require('express');
var router = express.Router();
var db = require('../db/db');
var User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.   
  sync({
    force: true,
  }).
  then(function() {
    User.bulkCreate([
      {
        username: 'Article 1',
        password: 'Article 1 Body'
      },
      {
        username: 'Article2',
        password: 'Article2 Body'
      }
    ]).then(function(insertedArticles) {
      console.log(insertedArticles.dataValues);
      res.render('index', { title: 'Magiterm' });
    });
  }).catch(function(err) {
    res.render('error', {title: 'Error'});
    console.log(err);
  });
});

module.exports = router;
