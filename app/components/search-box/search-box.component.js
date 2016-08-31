'use strict';

angular
    .module('myApp.searchBox')
    .component('searchBox', {
    templateUrl: 'components/search-box/search-box.template.html',
    bindings: {
        filters: '=',
        phraseFilter: '=',
        onUpdate: '&'
    },
    controller: ['$timeout', 'worksDao', 'searchHelper', function ($timeout, worksDao, searchHelper) {

        this.statusMessage = 'Préparation de l\'index de recherche...';

        worksDao.getWorks()
            .then(function (works) {
                return searchHelper.createImitationsIndex(works);
            })
            .then((function () {
                this.statusMessage = '';
            }).bind(this));

        this.deleteFilter = function (index) {
            this.filters.splice(index, 1);
            this.onUpdate();
        };

        this.addFilter = function () {
            this.filters.push({});
        };

        this.reset = function () {
            this.filters = [];
            this.phraseFilter = '';
            $timeout((function () {
                this.onUpdate();
            }).bind(this));
        };
    }]
});