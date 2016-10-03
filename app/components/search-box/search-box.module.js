'use strict';

require('ui-select');
require('../../services/search-fields-dao/search-fields-dao.module');

angular.module('myApp.searchBox', [
    'ui.select',
    'myApp.searchFieldsDao'
]);

require('./search-box.component');
require('./search-filter.component');