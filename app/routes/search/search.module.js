'use strict';

require('../../components/search-box/search-box.module');
require('../../components/text-display/text-display.module');
require('../../services/search-helper/search-helper.module');
require('../../services/works-dao/works-dao.module');

angular.module('myApp.search', [
    'myApp.searchBox',
    'myApp.textDisplay',
    'myApp.searchHelper',
    'myApp.worksDao'
]);

require('./search.component');