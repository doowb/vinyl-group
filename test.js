'use strict';

require('mocha');
var groupArray = require('group-array');
var assert = require('assert');
var File = require('vinyl');
var Base = require('base');
var VinylGroup = require('./');
var group, files;

describe('vinyl-group', function() {
  beforeEach(function() {
    files = [
      new File({path: 'one.hbs', data: {tags: ['foo']}, contents: new Buffer('')}),
      new File({path: 'two.hbs', data: {tags: ['bar']}, contents: new Buffer('')}),
      new File({path: 'three.hbs', data: {tags: ['foo']}, contents: new Buffer('')}),
      new File({path: 'four.hbs', data: {tags: ['bar']}, contents: new Buffer('')}),
      new File({path: 'five.hbs', data: {tags: ['foo', 'bar']}, contents: new Buffer('')}),
    ];

    group = groupArray(files, 'data.tags');
  });

  it('should export a function', function() {
    assert.equal(typeof VinylGroup, 'function');
  });

  it('should create an instance', function() {
    var vinylGroup = new VinylGroup();
    assert(vinylGroup instanceof VinylGroup);
    assert(vinylGroup instanceof Base);
  });

  it('should create an instance without new', function() {
    var vinylGroup = VinylGroup();
    assert(vinylGroup instanceof VinylGroup);
    assert(vinylGroup instanceof Base);
  });

  it('should create an instance with a group', function() {
    var vinylGroup = VinylGroup(group);
    assert.deepEqual(vinylGroup.group, group);
  });
});
