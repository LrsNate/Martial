'use strict';

let packageJson = require('../../../package.json');
console.log(packageJson.version);
angular
    .module('myApp.version', [])
    .value('version', packageJson.version);
