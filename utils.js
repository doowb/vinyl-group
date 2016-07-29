'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('class-utils', 'cu');
require('define-property', 'define');
require('pascalcase', 'pascal');
require('vinyl', 'File');
require = fn;

/**
 * Expose `utils` modules
 */

module.exports = utils;
