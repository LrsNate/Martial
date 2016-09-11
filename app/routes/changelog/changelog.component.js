'use strict';

angular
    .module('myApp.changelog')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/changelog', {
            template: '<changelog></changelog>'
        });
    }])
    .component('changelog', {
        templateUrl: 'routes/changelog/changelog.template.html',
        controller: [function () {

        }]
    });