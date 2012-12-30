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

  var loadBase = function() {
    _(64).times(function(row){
      _(64).times(function(col){
        var ypos = WIDTH * col;
        var xpos = HEIGHT * row;
        var block = place('placeholder', xpos, ypos, row, col );
      });
    });
  };

  var loadTiles = function() {
      _.each(tileMap, function(row, rowIndex) {
        _.each(row, function(tileName, blockIndex){
          placeTile(tileName, rowIndex, blockIndex);
        });
      });
  };

  var placeTile = function(tileName, rowIndex, colIndex) {
    var ypos = WIDTH  * colIndex;
    var xpos = HEIGHT * rowIndex;
    place('mask', xpos + TOP_OFFSET + 1, ypos, rowIndex, colIndex );
    return place('tile ' + tileName, xpos, ypos, rowIndex, colIndex );
  };

  var place = function(className, xpos, ypos, row, col) {
    return $("<div class='"+className+"' data-row='"+row+"' data-col='"+col+"'></div>").
      appendTo('#main').
      css({ top: xpos, left: ypos, zIndex: row });
  };

  var setupSelections = function() {
    $('.tile').on(tileHover);
  };
  var tileHover = {
    'mouseover': function() {
      $(this).addClass('blink');
      //hoverBlock.hide();
    },
    'mouseout': function() {
      $(this).removeClass('blink');
    }
  };

  var setupClick = function() {
    $('.placeholder').on('click', function(e) {
      var current = $(this);
      var row     = current.data('row');
      var col     = current.data('col');
      var tile    = placeTile('stone', row, col);
      tile.on(tileHover);
    });
  };

  var exports = {
    run: function() {
      loadBase();
      loadTiles();
      setupSelections();
      setupClick();
    }
  };
  return exports;
});
