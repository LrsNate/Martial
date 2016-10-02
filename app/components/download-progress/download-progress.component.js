'use strict';

angular.module('myApp.downloadProgress')
    .component('downloadProgress', {
        bindings: {
            achieved: '=',
            total: '='
        },
        templateUrl: 'components/download-progress/download-progress.template.html',
        controller: ['$scope', function ($scope) {
            this.percentage = 0;
            $scope.$watch(() => this.achieved, () => {
                this.percentage = parseInt(this.achieved / this.total * 100);
            });
        }]
    });