'use strict';

angular
    .module('myApp.searchFilter')
    .component('searchFilter', {
        templateUrl: 'components/search-filter/search-filter.template.html',
        bindings: {
            filter: '=',
            onDelete: '&'
        },
        controller: ['$filter', 'searchFieldsDao', function ($filter, searchFieldsDao) {
            this.fields = searchFieldsDao.fields;

            this.matchers = searchFieldsDao.matchers;

            this.getMatchers = function (field) {
                var fieldType = $filter('filter')(this.fields, {id: field}, true)[0].type;
                return $filter('filter')(this.matchers, {type: fieldType}, true);
            };
        }]
    });