//'use strict'

require.config({
  paths: {
    'underscore': 'underscore-min'
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

  editor.run();

});
