'use strict';

require('mocha');
var assert = require('assert');
var vinylGroup = require('./');

describe('vinyl-group', function() {
      it('should export a function', function() {
    assert.equal(typeof vinylGroup, 'function');
  });

    it('should export an object', function() {
    assert(vinylGroup);
    assert.equal(typeof vinylGroup, 'object');
  });

    it('should throw an error when invalid args are passed', function(cb) {
    try {
      vinylGroup();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected first argument to be a string');
      assert.equal(err.message, 'expected a callback function');
      cb();
    }
  });
});
