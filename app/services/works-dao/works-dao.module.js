'use strict';

require('../file-helper/file-helper.module');
require('../sort-helper/sort-helper.module');

angular.module('myApp.worksDao', [
    'myApp.fileHelper',
    'myApp.sortHelper'
]);

require('./works-dao.service');