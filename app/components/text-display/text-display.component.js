'use strict';

angular
    .module('myApp.textDisplay')
    .component('textDisplay', {
        templateUrl: 'components/text-display/text-display.template.html',
        bindings: {
            work: '=',
            onDelete: '&'
        },
        controller: ['$scope', 'worksDao', function ($scope, worksDao) {
            this.isCollapsed = true;
            this.referencedWork = null;

            const init = () => {
                if (this.work.originId) {
                    worksDao.getWork(this.work.originId).then((doc) => {
                        this.referencedWork = doc;
                    });
                } else {
                    this.referencedWork = null;
                }
                this.isCollapsed = false;
            };

            $scope.$watch(() => this.work, init);
        }]
    });