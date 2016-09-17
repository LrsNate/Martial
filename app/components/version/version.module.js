'use strict';

let packageJson = require('../package.json');

angular
    .module('myApp.version', [])
    .value('version', packageJson.version);
