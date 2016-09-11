'use strict';

angular
    .module('myApp.navigationBar')
    .component('navigationBar', {
        templateUrl: 'components/navigation-bar/navigation-bar.template.html',
        controller: ['$location', function ($location) {
            this.route = $location.path();
        }]
    });