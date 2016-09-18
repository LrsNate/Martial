'use strict';

angular
    .module('myApp.changelogItems')
    .directive('changelogRefactor', function () {
        return {
            restrict: 'A',
            transclude: true,
            template: '<span class="label label-primary">Refactor</span> <span ng-transclude></span>'
        };
    });