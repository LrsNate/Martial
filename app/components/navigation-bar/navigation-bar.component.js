'use strict';

angular
    .module('myApp.navigationBar')
    .component('navigationBar', {
        templateUrl: 'components/navigation-bar/navigation-bar.template.html',
        controller: ['$scope', '$location', function ($scope, $location) {
            $scope.$watch(() => $location.path(), (route) => {
                this.route = route;
            });
            this.route = $location.path();
        }]
    });