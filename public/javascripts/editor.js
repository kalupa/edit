//'use strict'

var WIDTH  = 101;
var HEIGHT = 81;

define(['zepto', 'underscore'], function ($, _) {

  var tileMap = [
    ['grass', 'stone', 'grass'],
    ['stone', 'stone', 'stone']
  ];

  var loadTiles = function() {
      _.each(tileMap, function(row, rowIndex) {
        _.each(row, function(tileName, blockIndex){
          $("<div class='tile " + tileName + "'></div>").
            appendTo('#main').
            css({ top: HEIGHT * rowIndex, left: WIDTH * blockIndex });
        });
      });
  };

  var exports = {
    run: function() {
      loadTiles();
    }
  };
  return exports;
});
