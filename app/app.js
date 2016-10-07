import angular from 'angular';
import 'angular-route';
import 'angular-animate';
import 'angular-sanitize';
import NavigationBar from './components/navigation-bar';
import Version from './components/version';
import Add from './routes/add';
import Boot from './routes/boot';
import Changelog from './routes/changelog';
import Edit from './routes/edit';
import Search from './routes/search';
import Settings from './routes/settings';

function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/boot'});
}
config.$inject = ['$locationProvider', '$routeProvider'];

// Declare app level module which depends on views, and components
export default angular.module('myApp', [
        'ngRoute',
        'ngAnimate',
        'ngSanitize',
        NavigationBar.name,
        Version.name,
        Add.name,
        Boot.name,
        Changelog.name,
        Edit.name,
        Search.name,
        Settings.name
    ])
    .config(config);
