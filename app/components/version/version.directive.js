'use strict';

angular
    .module('myApp.version')
    .directive('appVersion', ['version', (version) => {
        return (scope, elm, attrs) => {
            elm.text(version);
        };
    }]);
