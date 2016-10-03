'use strict';

require('angular');
require('angular-route');
require('angular-animate');
require('angular-sanitize');

require('./components/navigation-bar/navigation-bar.module');
require('./components/version/version.module');

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
