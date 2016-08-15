'use strict';

angular
    .module('myApp.searchFilter')
    .component('searchFilter', {
        templateUrl: 'components/search-filter/search-filter.template.html',
        bindings: {filter: '='},
        controller: function () {
        }
    });