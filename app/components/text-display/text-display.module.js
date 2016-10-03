'use strict';

require('angular-ui-bootstrap');
require('../../services/works-dao/works-dao.module');

angular.module('myApp.textDisplay', [
    'ui.bootstrap',
    'myApp.worksDao'
]);

require('./text-display.component');