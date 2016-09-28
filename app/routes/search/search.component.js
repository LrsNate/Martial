'use strict';

angular.module('myApp.search')

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/search', {
            template: '<search></search>'
        });
    }])

    .component('search', {
        controller: ['$location', 'worksDao', 'searchHelper', function ($location, worksDao, searchHelper) {

            this.fullWorks = [];
            this.works = [];
            this.filters = [];
            this.phraseFilter = '';
            this.statusMessage = 'Chargement des épigrammes...';
            this.selectedWork = null;
            this.hasReferences = {};

            worksDao.getWorks().then((works) => {
                this.fullWorks = works;
                this.works = works;
                this.statusMessage = 'Aucune épigramme n\'a pu être trouvée avec ces critères';

                _.each(works, (work) => {
                    if (work.originId)
                        this.hasReferences[work.originId] = true;
                });
            });

            this.setSelectedWork = (work) => this.selectedWork = work;

            this.edit = (work) => {
                $location.path('/edit/' + work._id);
            };

            this.filterByReference = (work) => {
                this.filters = [
                    {
                        field: {name: 'Oeuvre', id: 'work', type: 'work'},
                        matcher: {name: 'imite', id: 'imitates', type: 'work'},
                        term: {name: work.author + ': ' + work.reference, id: work._id}
                    }
                ];
                this.phraseFilter = '';
                this.refreshFilters();
            };

            this.refreshFilters = () => {
                searchHelper.applyFilters(this.filters, this.fullWorks)
                    .then((works) => this.works = works);
            };
        }],
        templateUrl: 'routes/search/search.template.html'
    });
