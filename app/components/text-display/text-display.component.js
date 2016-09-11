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
                if (this.work.author === 'Martial') {
                    this.referencedWork = null;
                } else {
                    worksDao.getMartialWork(this.work.martialReference).then((doc) => {
                        this.referencedWork = doc;
                    });
                }
                this.isCollapsed = false;
            };

            $scope.$watch(() => this.work, init);
        }]
    });