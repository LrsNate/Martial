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
            this.works = [
                {
                    author: 'Martial',
                    reference: 'I, 15',
                    title: 'Ad Julium'
                },
                {
                    author: 'Martial',
                    reference: 'I, 16',
                    title: 'Ad Avitum, de suo libro'
                }
            ];
        }]
    });
