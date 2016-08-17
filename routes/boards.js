var express = require('express');
var router = express.Router();
var Board = require('../models/board');

router.post('/', function(req, res, next) {
  var newBoard = Board(req.body);

  newBoard.save(function(err, board) {
    if (err) console.log(err);
    res.json(board);
  });
});

router.post('/:id', function(req, res, next){
  Board.findByIdAndUpdate(req.params.id, req.body, function(err, board){
    res.json(board);
  });
});

router.get('/:id', function(req, res, next) {
  Board.findById(req.params.id, function(err, board){
    res.json(board);
  });
});

module.exports = router;
