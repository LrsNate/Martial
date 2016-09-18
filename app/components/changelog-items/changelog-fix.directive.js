'use strict';

angular
    .module('myApp.changelogItems')
    .directive('changelogFix', function () {
        return {
            restrict: 'A',
            transclude: true,
            template: '<span class="label label-danger">Fix</span> <span ng-transclude></span>'
        };
    });