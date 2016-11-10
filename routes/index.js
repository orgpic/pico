var express = require('express');
var router = express.Router();
var db = require('../db/db');
var Article = require('../models/Articles');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.   
  sync({
    force: true,
  }).
  then(function() {
    Article.bulkCreate([
      {
        title: 'Article 1',
        body: 'Article 1 Body'
      },
      {
        title: 'Article2',
        body: 'Article2 Body'
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
