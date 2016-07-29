'use strict';

var utils = require('./utils');

/**
 * Expose `VinylGroup`
 */

module.exports = exports = VinylGroup;

/**
 * Create an instance of `VinylGroup`. Pass in a group from [group-array][] to store.
 *
 * ```js
 * var files = [ ... ]; // array of vinyl files
 * var group = groupArray(files, 'data.tags');
 * var vinylGroup = new VinylGroup(group);
 *
 * console.log(vinylGroup.group === group);
 * //=> true
 *
 * console.log(vinylGroup);
 * //=> <VinylGroup ["foo (3)", "bar (3)"]>
 * ```
 * @param {Object} `group` A group object created by passing an array of [vinyl][] file into [group-array][].
 * @api public
 */

function VinylGroup(group) {
  if (!(this instanceof VinylGroup)) {
    return new VinylGroup(group);
  }

  if (!group) group = {};
  utils.File.call(this);

  is(this, 'VinylGroup');
  this.group = group;
}

/**
 * Inherit `Vinyl`
 */

utils.cu.inherit(VinylGroup, utils.File);

/**
 * Override the vinyl `inspect` method.
 */

VinylGroup.prototype.inspect = function() {
  var name = this._name.charAt(0).toUpperCase() + this._name.slice(1);
  var inspect = [];

  var fp = this.key || ((this.path && this.base) ? this.relative : this.path);
  if (fp) inspect.push('"' + fp + '"');

  var keys = Object.keys(this.group);
  if (keys.length) {
    inspect.push(JSON.stringify(keys.map(function(key) {
      if (Array.isArray(this.group[key])) {
        return `${key} (${this.group[key].length})`;
      }
      return key;
    }, this)));
  }

  return '<' + name + ' ' + inspect.join(' ') + '>';
};

/**
 * Set the name and type of object.
 */

function is(obj, name) {
  if (typeof name !== 'string') {
    throw new TypeError('expected name to be a string');
  }
  utils.define(obj, 'is' + utils.pascal(name), true);
  utils.define(obj, '_name', name);
};
