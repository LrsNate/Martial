'use strict';

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
