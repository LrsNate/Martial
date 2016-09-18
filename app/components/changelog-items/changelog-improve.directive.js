'use strict';

angular
    .module('myApp.changelogItems')
    .directive('changelogImprove', function () {
        return {
            restrict: 'A',
            transclude: true,
            template: '<span class="label label-info">Modif</span> <span ng-transclude></span>'
        };
    });