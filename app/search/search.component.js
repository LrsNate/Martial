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

            this.setSelectedWork = function (index) {
                this.selectedWork = this.works[index];
            };

            this.filters = [];
            this.works = [
                {
                    author: 'Martial',
                    reference: 'I, 15',
                    title: 'Ad Julium',
                    latinText: 'abcdef',
                    frenchText: 'fghijkl'
                },
                {
                    author: 'Martial',
                    reference: 'I, 16',
                    title: 'Ad Avitum, de suo libro'
                }
            ];
            this.selectedWork = this.works[0];
        }]
    });
