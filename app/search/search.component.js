'use strict';

angular
    .module('myApp.search')

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/search', {
            template: '<search></search>'
        });
    }])

    .component('search', {
        templateUrl: 'search/search.template.html',
        controller: [function () {
            this.filters = [];
        }]
    });
