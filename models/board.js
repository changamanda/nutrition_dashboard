var mongoose = require('mongoose');

var boardSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
  zoom: Number,
  query: String,
  places: String,
  quote: String,
  author: String,
  starred: String
});

var Board = mongoose.model('Board', boardSchema);

module.exports = Board;
