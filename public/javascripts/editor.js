define(['zepto', 'underscore'], function ($, _) {
  "use strict";

  var WIDTH       = 101;
  var HEIGHT      = 81;
  var TOP_OFFSET  = 10;
  var LEFT_OFFSET = -1;

  var tileMap = [
    //['grass', 'dirty', 'dirty', 'dirty', 'dirty', 'dirty', 'water', 'water', 'grass'],
    //['grass', 'dirty', 'grass', 'stone', 'grass', 'dirty', 'water', 'water', 'grass'],
    //['grass', 'dirty', 'stone', 'stone', 'stone', 'dirty', 'water', 'water', 'grass'],
    //['grass', 'dirty', 'dirty', 'dirty', 'dirty', 'dirty', 'water', 'water', 'grass'],
    //['grass', 'grass', 'grass', 'grass', 'grass', 'dirty', 'water', 'water', 'grass']
  ];

  var place = function(className, xpos, ypos, row, col) {
    return $("<div class='"+className+"' data-row='"+row+"' data-col='"+col+"'></div>").
      appendTo('#main').
      css({ top: xpos, left: ypos, zIndex: row });
  };

  var loadBase = function() {
    _(64).times(function(row){
      _(64).times(function(col){
        var ypos = WIDTH * col;
        var xpos = HEIGHT * row;
        var block = place('placeholder', xpos, ypos, row, col );
      });
    });
  };

  var placeTile = function(tileName, rowIndex, colIndex) {
    var ypos = WIDTH  * colIndex;
    var xpos = HEIGHT * rowIndex;
    place('mask', xpos + TOP_OFFSET + 1, ypos, rowIndex, colIndex );
    return place('tile ' + tileName, xpos, ypos, rowIndex, colIndex );
  };

  var loadTiles = function() {
      _.each(tileMap, function(row, rowIndex) {
        _.each(row, function(tileName, blockIndex){
          placeTile(tileName, rowIndex, blockIndex);
        });
      });
  };

  var setupSelections = function() {
    $('#main').
    delegate('.tile', 'mouseover',
      function() { $(this).addClass('blink'); }
    ).
    delegate('.tile', 'mouseout',
      function() { $(this).removeClass('blink'); }
    );
  };

  var currentTile = 'stone';
  var setupClick  = function() {
    $('#main').
    delegate('.placeholder, .tile', 'click',
      function() {
        var current = $(this);
        var row     = current.data('row');
        var col     = current.data('col');

        if (current.hasClass('tile')) {
          current.removeClass().addClass(currentTile + ' tile blink');
        } else {
          var tile = placeTile(currentTile, row, col);
          current.remove();
        }
      });
  };

  $('a.stone').addClass('selected');
  var setupPalette = function() {
    var items = $('#palette a');
    items.on('click', function(e) {
      items.removeClass('selected');
      currentTile = $(this).attr('class');
      $(this).addClass('selected');
    });
  };

  var exports = {
    load: function() {
      loadBase();
      loadTiles();
      setupSelections();
      setupClick();
      setupPalette();
    }
  };
  return exports;
});
