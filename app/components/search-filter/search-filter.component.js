'use strict';

angular
    .module('myApp.searchFilter')
    .component('searchFilter', {
        templateUrl: 'components/search-filter/search-filter.template.html',
        bindings: {filter: '='},
        controller: ['$filter', function ($filter) {
            this.fields = [
                {name: 'Auteur', id: 'author', type: 'string'},
                {name: 'Publication', id: 'date_published', type: 'date'},
                {name: 'Contenu', id: 'content', type: 'text'}
            ];

            this.matchers = [
                {name: 'est', id: 'is', type: 'string'},
                {name: 'n\'est pas', id: 'is_not', type: 'string'},
                {name: 'depuis', id: 'after', type: 'date'},
                {name: 'jusqu\'à', id: 'before', type: 'date'},
                {name: 'contient', id: 'contains', type: 'text'},
                {name: 'exclut', id: 'excludes', type: 'text'}
            ];

            this.getMatchers = function (field) {
                var fieldType = $filter('filter')(this.fields, {id: field}, true)[0].type;
                return $filter('filter')(this.matchers, {type: fieldType}, true);
            };
        }]
    });