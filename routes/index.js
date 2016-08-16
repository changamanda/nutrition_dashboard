var express = require('express');
var router = express.Router();
var Board = require('../models/board');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/:id', function(req, res, next) {
  Board.findById(req.params.id, function(err, board){
    res.render('index', {board: board});
  });
});

router.get('/quotes/random', function(req, res, next){
  var matches;
  var quotes = require('./quotes');

  while (!matches){
    var quote = quotes[Math.floor(Math.random()*quotes.length)];
    var reg = /\"(.+)\" --(.+)/;
    matches = quote.match(reg);
  }

  res.json({quote: matches[1], author: matches[2]});
});

module.exports = router;
