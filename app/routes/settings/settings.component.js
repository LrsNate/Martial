'use strict';

angular.module('myApp.settings')

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/settings', {
            template: '<settings></settings>'
        });
    }])

    .component('settings', {
        controller: [function () {

        }],
        templateUrl: 'routes/settings/settings.template.html'
    });