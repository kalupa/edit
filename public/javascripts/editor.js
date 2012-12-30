//'use strict'

var WIDTH       = 101;
var HEIGHT      = 81;
var TOP_OFFSET  = 10;
var LEFT_OFFSET = -1;

define(['zepto', 'underscore'], function ($, _) {

  var tileMap = [
    ['grass', 'dirty', 'dirty', 'dirty', 'dirty', 'dirty', 'water', 'water', 'grass'],
    ['grass', 'dirty', 'grass', 'stone', 'grass', 'dirty', 'water', 'water', 'grass'],
    ['grass', 'dirty', 'stone', 'stone', 'stone', 'dirty', 'water', 'water', 'grass'],
    ['grass', 'dirty', 'dirty', 'dirty', 'dirty', 'dirty', 'water', 'water', 'grass'],
    ['grass', 'grass', 'grass', 'grass', 'grass', 'dirty', 'water', 'water', 'grass']
  ];

  var loadTiles = function() {
      _.each(tileMap, function(row, rowIndex) {
        _.each(row, function(tileName, blockIndex){
          placeMask(rowIndex, blockIndex);
          placeBlock(tileName, rowIndex, blockIndex);
        });
      });
  };
  var placeMask = function (rowIndex, blockIndex) {
    $("<div class='mask'></div>").
      appendTo('#main').
      css({ top: ( HEIGHT * rowIndex ) + TOP_OFFSET +1, left: WIDTH * blockIndex });
  };

  var placeBlock = function(tileName, rowIndex, blockIndex) {
    $("<div class='tile " + tileName + "'></div>").
      appendTo('#main').
      css({ top: HEIGHT * rowIndex, left: WIDTH * blockIndex });
  };

  var setupSelections = function() {
    var tiles = $('.tile');
    tiles.on('mouseover',function(e){
      tiles.removeClass('blink');
      $(this).addClass('blink');
    });
  };

  var exports = {
    run: function() {
      loadTiles();
      setupSelections();
    }
  };
  return exports;
});
