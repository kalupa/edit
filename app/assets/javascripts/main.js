//'use strict'

require.config({
  paths: {
    'underscore': 'underscore-min',
    'zepto': 'zepto'
  },
  shim: {
    zepto: {
      exports: '$'
    },
    underscore: {
      exports: '_'
    }
  }
});

require(['zepto','editor'], function ($,editor) {

  editor.load();

});
