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
        controller: ['databaseConnector', function (databaseConnector) {

            this.fullWorks = databaseConnector.getWorks();
            this.works = this.fullWorks;

            this.setSelectedWork = function (work) {
                this.selectedWork = work;
            };

            this.filterByReference = function (work) {
                this.works = databaseConnector.getImitations(work.reference);
            };

            this.filters = [];
            this.works = databaseConnector.getWorks();

            this.selectedWork = this.works[0];
        }]
    });
