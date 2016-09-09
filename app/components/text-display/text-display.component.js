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

            var init = function () {
                if (this.work.author === 'Martial') {
                    this.referencedWork = null;
                } else {
                    worksDao.getMartialWork(this.work.martialReference).then(function (doc) {
                        this.referencedWork = doc;
                        console.log(doc);
                    }.bind(this));
                }
                this.isCollapsed = false;
            }.bind(this);

            $scope.$watch(() => this.work, init);
        }]
    });