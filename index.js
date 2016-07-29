'use strict';

var Base = require('base');
var Vinyl = require('vinyl');

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
  Vinyl.call(this);
  Base.call(this);

  this.is('VinylGroup');
  this.group = group;
}

/**
 * Inherit `Base` and `Vinyl`
 */

Base.extend(VinylGroup);
Base.inherit(VinylGroup, Vinyl);

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
