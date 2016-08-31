'use strict';

angular
    .module('myApp.boot')

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/boot', {
            template: '<boot></boot>'
        });
    }])

    .component('boot', {
        controller: [function () {

        }],
        templateUrl: 'routes/boot/boot.template.html'
    });