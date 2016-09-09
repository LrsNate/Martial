'use strict';

angular
    .module('myApp.version', [])
    .value('version', process.env.npm_package_version);
