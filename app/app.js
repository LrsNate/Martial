'use strict';

require('./bower_components/angular-route/angular-route');
require('./bower_components/angular-animate/angular-animate');
require('./bower_components/angular-sanitize/angular-sanitize');
require('./bower_components/angular-filters/dist/angular-filters');

require('./')

require('./routes/boot/boot.module');
require('./routes/changelog/changelog.module');
require('./routes/edit/edit.module');
require('./routes/search/search.module');
require('./routes/settings/settings.module');

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngAnimate',
    'ngSanitize',
    'angular-filters',
    'myApp.boot',
    'myApp.changelog',
    'myApp.edit',
    'myApp.navigationBar',
    'myApp.search',
    'myApp.settings',
    'myApp.version',
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/boot'});
}]);
