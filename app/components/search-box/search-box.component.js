'use strict';

angular.module('myApp.searchBox').component({
    templateUrl: 'components/search-box/search-box.template.html',
    bindings: {
        filters: '='
    },
    controller: function () {
        this.deleteFilter = function (index) {
            this.filters.splice(index, 1);
        };
    }
});