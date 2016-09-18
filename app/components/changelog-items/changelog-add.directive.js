'use strict';

angular
    .module('myApp.changelogItems')
    .directive('changelogAdd', function () {
        return {
            restrict: 'A',
            transclude: true,
            template: '<span class="label label-success">Ajout</span> <span ng-transclude></span>'
        };
    });