require = window.require

require.config(
  paths:
    'underscore': '/assets/underscore-min'
    'zepto': '/assets/zepto'
    'editor': '/assets/editor'
  shim:
    zepto:
      exports: '$'
    underscore:
      exports: '_'
)

require(['zepto', 'editor'], ($, editor) ->
  editor.load()
)
