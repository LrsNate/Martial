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
        controller: ['worksDao', function (worksDao) {

            this.fullWorks = worksDao.getWorks();
            this.works = this.fullWorks;

            this.setSelectedWork = function (work) {
                this.selectedWork = work;
            };

            this.filterByReference = function (work) {
                this.filters = [
                    {field: 'work', matcher: 'imitates', term: work.reference}
                ];
            };

            this.filters = [];
            this.works = worksDao.getWorks();

            this.selectedWork = this.works[0];
        }]
    });
