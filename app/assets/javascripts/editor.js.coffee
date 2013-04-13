WIDTH       = 101
HEIGHT      = 81
TOP_OFFSET  = 10
LEFT_OFFSET = -1
window.define(['zepto', 'underscore'], ($,_) ->

  place = (className, xpos, ypos, row, col) ->
    $("<div class='#{className}' data-row='#{row}' data-col='#{col}'></div>").
      appendTo('#main').
      css(
        top: xpos
        left: ypos
        zIndex: row
      )

  placeTile = (tileName, rowIndex, colIndex) ->
    ypos = WIDTH * colIndex
    xpos = HEIGHT * rowIndex
    place('mask', xpos + TOP_OFFSET + 1, ypos, rowIndex, colIndex )
    place("tile #{tileName}", xpos, ypos, rowIndex, colIndex)

  loadTiles = ->
    _.each(tileMap, (row, rowIndex) ->
      _.each(row, (tileName, blockIndex) ->
          placeTile(tileName, rowIndex, blockIndex)
        )
      )

  setupSelections = ->
    $('#main').
    delegate('.tile', 'mouseover', -> $(this).addClass 'blink').
    delegate('.tile', 'mouseout', -> $(this).removeClass 'blink')

  currentTile = 'stone'
  setupClick = ->
    $('#main').
    delecate('.placeholder, .tile', 'click', ->
        current = $(this)
        row = current.data 'row'
        col = current.data 'col'

        if current.hasClass 'tile'
          current.removeClass().addClass "#{currentTile} tile blink"
        else
          tile = placeTile(currentTile, row, col)
          current.remove()
      )

  $('a.stone').addClass('selected')
  setupPalette = ->
    items = $('#palette a')
    items.on('click', (e) ->
      items.removeClass('selected')
      currentTile = $(this).attr('class')
      $(this).addClass('selected')
    )

  exports =
    load: ->
      loadBase()
      loadTiles()
      setupSelections()
      setupClick()
      setupPalette()
)
