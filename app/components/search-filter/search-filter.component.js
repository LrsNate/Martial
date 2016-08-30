'use strict';

angular
    .module('myApp.searchFilter')
    .component('searchFilter', {
        templateUrl: 'components/search-filter/search-filter.template.html',
        bindings: {
            filter: '=',
            onUpdate: '&',
            onDelete: '&',
        },
        controller: ['searchFieldsDao', function (searchFieldsDao) {
            this.fields = searchFieldsDao.fields;

            this.matchers = searchFieldsDao.matchers;

            this.getMatchers = function (field) {
                if (!field) return [];
                var fieldType = _.find(this.fields, {id: field}).type;
                return _.filter(this.matchers, {type: fieldType});
            };
        }]
    });