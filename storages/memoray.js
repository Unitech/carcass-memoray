var debug = require('debug')('carcass:Storage:Memoray');

var carcass = require('carcass');
var array = require('array.js');
var noop = function() {};


module.exports = carcass.factories.Storage({
  title: 'Memoray',
  cache: 'memoray',
  initialize: initialize
});

function initialize(instance, options) {
  debug('initializing');

  var store = instance.store = array();

    // Create or Update.
    instance.put = function(data, callback) {
      debug('saving');
      process.nextTick(function() {
        callback = callback || noop;
        store.push(data);
        callback(null, data);
      });
    };

    // Read.
    instance.find = function(data, callback) {
     debug('reading');
     process.nextTick(function() {
      callback = callback || noop;
      var doc = store.find(data);
      if (typeof doc == 'undefined') doc = null;
      callback(null, doc);
    });
   };

   instance.del = function(data, callback) {
     var key = '';

     debug('deleting');
     process.nextTick(function() {	    
       for (tKey in data) { 
        key = tKey; break; 
      };
      store = store.reject(function(dt) { return dt[key] == data[key];  });      
      callback(null, store);
    });

   };

 };

