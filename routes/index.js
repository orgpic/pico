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
        Username: 'Article 1',
        Password: 'Article 1 Body'
      },
      {
        Username: 'Article2',
        Password: 'Article2 Body'
      }
    ], {
      vallide: true,
      ignoreDuplicates: true
    }).then(function(insertedArticles) {
        console.log(insertedArticles.dataValues);
        res.render('index', { title: 'Magiterm' });
    });
  }).catch(function(err) {
    if (err) {
      console.log(err);
    }
  });
});

module.exports = router;
